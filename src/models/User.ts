// src/models/User.ts
import { DynamoDB } from 'aws-sdk';
// import config from '../config';

// const dynamoDB = new DynamoDB.DocumentClient(config.aws_auth_service_config);
import { dynamoDB } from "../configs/awsConfig";

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
    await dynamoDB.putItem(params).promise();
    return userAttributes;
  },

  async findOne(query: { email: string }): Promise<UserDocument | null> {
    console.log('qury in findOne ', query)
    // const params: DynamoDB.DocumentClient.QueryInput = {
    const params: DynamoDB.Types.QueryInput = {
      TableName: 'users',
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ':email': { S: query.email }
      },
    };
    // const response = await dynamoDB.query(params).promise();
    const response = await dynamoDB.query(params).promise();
    // let found = {};
    // response.Items?.forEach(item => found = item)
    // console.log('response ', response.Items?.forEach(item => found = item))
    // console.log('found ', found)
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
