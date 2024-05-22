require('dotenv').config();

const config = {
  aws_table_name: 'users',
  aws_local_config: {
    //Provide details for local configuration
  },
  aws_auth_service_config: {
    accessKeyId: process.env.AWS_IAM_AUTH_SERVICE_ACCESS_KEY,
    secretAccessKey: process.env.AWS_IAM_AUTH_SERVICE_SECRET_KEY,
    region: process.env.AWS_DYNAMO_DB_REGION,
  },
  aws_sqs_config: {
    accessKeyId: process.env.AWS_IAM_SQS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_IAM_SQS_SECRET_KEY,
    region: process.env.AWS_DYNAMO_DB_REGION,
  }
};

export default config;