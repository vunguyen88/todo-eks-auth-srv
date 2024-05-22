import AWS from "aws-sdk";
import dotenv from 'dotenv';
dotenv.config()

console.log('region in env ', process.env.AWS_REGION)
//import config from "../config";
const awsConfig = new AWS.Config({
    accessKeyId: process.env.AWS_IAM_AUTH_SERVICE_ACCESS_KEY,
    secretAccessKey: process.env.AWS_IAM_AUTH_SERVICE_SECRET_KEY,
    region: process.env.AWS_REGION
});
// awsConfig.update(config.aws_auth_service_config);
// awsConfig.update({
//     accessKeyId: process.env.AWS_IAM_AUTH_SERVICE_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_IAM_AUTH_SERVICE_SECRET_KEY,
//     region: process.env.AWS_REGION,
// });


// const sqsClient =  new AWS.SQS(awsConfig);
const sqsClient =  new AWS.SQS(awsConfig);

const dynamoDB = new AWS.DynamoDB();

export { sqsClient, dynamoDB }

// import { DynamoDB } from 'aws-sdk';
// import config from '../config';

//const dynamoDB = new DynamoDB.DocumentClient(config.aws_auth_service_config);