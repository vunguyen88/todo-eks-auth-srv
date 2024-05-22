// src/controllers/authController.ts
import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../utils/jwtUtils';
import { v1 as uuidv1 } from 'uuid';
import { Password } from '../utils/password';
import { sqsClient } from '../utils/sqs';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Hash the password before saving it
    const hashedPassword = await Password.toHash(password);

    const newUser = await User.create({ email, password: hashedPassword, userId: uuidv1() });
    const token = generateToken(newUser.userId);
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log('user ', user)
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // compare supplied password with stored password
    const validPassword = await Password.compare(user[0].password, password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // generate jwt-token
    const token = generateToken(user.userId);

    const param = {
      MessageBody:
        "Test message from Auth Service",
      QueueUrl: "https://sqs.us-east-2.amazonaws.com/715514482422/testSMSqueue",
    }
    const sqsRes = await sqsClient.sendMessage(param).promise();
    console.log('sqsRes ', sqsRes)

    res.json({ token });
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
