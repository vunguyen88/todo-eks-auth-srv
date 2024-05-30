// src/controllers/authController.ts
import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../utils/jwtUtils';
import { v1 as uuidv1 } from 'uuid';
import { Password } from '../utils/password';
import { sqsClient } from '../configs/awsConfig';
import { generateRandomCode } from '../utils/helper';
import { SendMessageRequest } from 'aws-sdk/clients/sqs'; // Import SendMessageRequest type from AWS SDK

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, MFAEnabled } = req.body;

    // Hash the password before saving it
    const hashedPassword = await Password.toHash(password);

    const newUser = await User.create({ email, password: hashedPassword, userId: uuidv1(), MFAEnabled, authCode: '', codeExpireAt: 0 });
    const token = generateToken(newUser.userId);
    console.log('Success create new user.')
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let requestId = Date.now();
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    if (user.length === 0) return res.status(404).json({ error: 'Not found' });

    // compare supplied password with stored password
    const validPassword = await Password.compare(user[0].password, password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // user not enabled MFA, generate jwt-token and send response
    if (!user[0].MFAEnabled) {
      const token = generateToken(user[0].userId);
      return res.json({ 
        MFAEnabled: false,
        authCode: '',
        token
      });
    }

    // user enabled MFA, generate auth code
    let authCode = generateRandomCode();

    // update key authCode and codeExpiredAt for 120s
    let codeExpireAt = Math.floor(Date.now() / 1000) + 120;
    await User.updateAuthCode(email, authCode, codeExpireAt)

    // send auth code to user email and send response
    const param: SendMessageRequest = {
      MessageBody: JSON.stringify({
        requestId,
        authCode,
        notificationType: "email",
        sender: "test@test.com",
        recipient: email,
        message: `Use code ${ authCode } to login, please do not share it with anyone`
      }),
      QueueUrl: "https://sqs.us-east-2.amazonaws.com/715514482422/todo-eks-sqs-mfa",
    }
    
    const sqsRes = await sqsClient.sendMessage(param).promise();
    console.log('sqsRes ', sqsRes)
    return res.send({
      status: 'success',
      message: 'continue with MFA',
      MFAEnabled: true,
      authCode: '',
      token: ''
    })
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const MFALogin = async (req: Request, res: Response) => {
  try {
    const { authCode, email } = req.body;
    const user = await User.findOne({ email });

    // code expired 
    if (user && user[0].codeExpireAt < Math.floor(Date.now() / 1000)) {

      return res.status(400).json({ 
        status: 'error',
        message: 'Code expired',
        MFAEnable: true,
        authCode: '',
        token: '' 
      });
    }
    // code incorrect
    if (user && user[0].authCode !== authCode) {

      return res.status(400).json({ 
        status: 'error',
        message: 'Code incorrect',
        MFAEnable: true,
        authCode: '',
        token: '' 
      });
    }

    // success login, generate token
    if (user && user[0].authCode === authCode) {

      const token = generateToken(user[0].userId);
      return res.status(200).json({ 
        status: 'success',
        message: 'login success',
        MFAEnable: true,
        authCode: '',
        token
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
