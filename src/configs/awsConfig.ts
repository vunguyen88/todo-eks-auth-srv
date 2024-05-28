import AWS from "aws-sdk";
//import dotenv from 'dotenv';
import { DynamoDB } from 'aws-sdk';

//dotenv.config()
console.log('AWS_IAM_AUTH_SERVICE_ACCESS_KEY', process.env.AWS_IAM_AUTH_SERVICE_ACCESS_KEY)
console.log('region ', process.env.AWS_REGION)
// Set the region
AWS.config.update({ region: 'us-east-2' });
const dynamoDB = new DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_IAM_AUTH_SERVICE_ACCESS_KEY,
  secretAccessKey: process.env.AWS_IAM_AUTH_SERVICE_SECRET_KEY,
  region: process.env.AWS_REGION
});

const awsConfig = new AWS.Config({
  accessKeyId: process.env.AWS_IAM_AUTH_SERVICE_ACCESS_KEY,
  secretAccessKey: process.env.AWS_IAM_AUTH_SERVICE_SECRET_KEY,
  region: process.env.AWS_REGION
});

const sqsClient =  new AWS.SQS(awsConfig);

export { sqsClient, dynamoDB }