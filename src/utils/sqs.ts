import AWS from "aws-sdk";
import config from "../config";
const awsConfig = new AWS.Config();
awsConfig.update(config.aws_remote_config);
const sqsClient =  new AWS.SQS(awsConfig);

export { sqsClient }

 