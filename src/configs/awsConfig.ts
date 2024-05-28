import AWS from "aws-sdk";
//import dotenv from 'dotenv';
import { DynamoDB } from 'aws-sdk';

//dotenv.config()
console.log('AWS_IAM_AUTH_SERVICE_ACCESS_KEY', process.env.AWS_IAM_AUTH_SERVICE_ACCESS_KEY)
console.log('AWS_REGION ', process.env.AWS_REGION)
// Set the region
const dynamoDB = new DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_IAM_AUTH_SERVICE_ACCESS_KEY,
  secretAccessKey: process.env.AWS_IAM_AUTH_SERVICE_SECRET_KEY,
  region: 'us-east-2'
});

const awsConfig = new AWS.Config({
  accessKeyId: process.env.AWS_IAM_AUTH_SERVICE_ACCESS_KEY,
  secretAccessKey: process.env.AWS_IAM_AUTH_SERVICE_SECRET_KEY,
  region: 'us-east-2'
});

const sqsClient =  new AWS.SQS(awsConfig);

export { sqsClient, dynamoDB }