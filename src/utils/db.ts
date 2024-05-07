import AWS from "aws-sdk";
import config from "../config";

AWS.config.update({region:'us-east-1'});

export const dd = new AWS.DynamoDB();