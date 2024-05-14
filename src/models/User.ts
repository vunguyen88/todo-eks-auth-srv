// src/models/User.ts
import { DynamoDB } from 'aws-sdk';
import config from '../config';

const dynamoDB = new DynamoDB.DocumentClient(config.aws_remote_config);

export interface UserAttributes {
  email: string;
  password: string;
  userId: string;
}

export interface UserDocument extends DynamoDB.DocumentClient.AttributeMap {}

export const User = {
  async create(userAttributes: UserAttributes): Promise<UserDocument> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: 'users',
      Item: userAttributes,
    };
    await dynamoDB.put(params).promise();
    return userAttributes;
  },

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

  async getAll(): Promise<UserDocument | null> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: 'users'
    }
    const response = await dynamoDB.scan(params).promise()
    return response.Items as UserDocument
  }
};
