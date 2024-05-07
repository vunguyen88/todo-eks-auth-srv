require('dotenv').config();

const config = {
  aws_table_name: 'users',
  aws_local_config: {
    //Provide details for local configuration
  },
  aws_remote_config: {
    accessKeyId: process.env.AWS_IAM_DYNAMODB_ACCESSKEY_LOCAL,
    secretAccessKey: process.env.AWS_IAM_DYNAMODB_SECRETKEY_LOCAL,
    region: process.env.AWS_DYNAMODB_REGION,
  }
};

export default config;