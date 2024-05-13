require('dotenv').config();

const config = {
  aws_table_name: 'users',
  aws_local_config: {
    //Provide details for local configuration
  },
  aws_remote_config: {
    accessKeyId: process.env.AWS_IAM_DYNAMO_DB_ACCESS_KEY,
    secretAccessKey: process.env.AWS_IAM_DYNAMO_DB_SECRET_KEY,
    region: process.env.AWS_DYNAMO_DB_REGION,
  }
};

export default config;