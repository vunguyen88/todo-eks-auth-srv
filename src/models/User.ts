// src/models/User.ts
import { DynamoDB } from 'aws-sdk';
// import config from '../config';
import { dynamoDB } from "../configs/awsConfig";

//const dynamoDB = new DynamoDB.DocumentClient(config.aws_remote_config);

export interface UserAttributes {
  email: string;
  password: string;
  userId: string;
  MFAEnabled: boolean;
  authCode: string;
  codeExpireAt: number;
}

export interface UserDocument extends DynamoDB.DocumentClient.AttributeMap {}

export const User = {
  // create new user
  async create(userAttributes: UserAttributes): Promise<UserDocument> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: 'users',
      Item: userAttributes,
    };
    await dynamoDB.put(params).promise();
    return userAttributes;
  },

  // find user
  async findOne(query: { email: string }): Promise<UserDocument | null> {
    const params: DynamoDB.DocumentClient.QueryInput = {
      TableName: 'users',
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ':email': query.email,
      },
    };
    const response = await dynamoDB.query(params).promise();

    return response.Items as UserDocument | null;
  },

  // get all user
  async getAll(): Promise<UserDocument | null> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: 'users'
    }
    const response = await dynamoDB.scan(params).promise()
    return response.Items as UserDocument
  },

  // update user
  async updateAuthCode(
    email: string,
    authCode: string,
    codeExpireAt: number
  ) {
    const params: DynamoDB.DocumentClient.UpdateItemInput  = {
      TableName: 'users',
      Key: {
        email: email
      },
      UpdateExpression: 'SET authCode = :authCodeVal, codeExpireAt = :codeExpireAtVal',
      ExpressionAttributeValues: {
        ':authCodeVal': authCode,
        ':codeExpireAtVal': codeExpireAt
      }
    };
    try {
      const result = await dynamoDB.update(params).promise();
      console.log('Update succeeded:', result);
      return result
    } catch (error) {
      console.error('Update failed:', error);
    }
  }
};
