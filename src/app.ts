// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
// import config from "./config";
// import AWS from "aws-sdk";

// AWS.config.update(config.aws_remote_config);
const app = express();

// const allowedOrigins = ['http://localhost:3000'];
const allowedOrigins = '*';
const options: cors.CorsOptions = {
    origin: allowedOrigins
};

console.log('process.env REGISTRY_SECRET_TEST', process.env.REGISTRY_SECRET_TEST);
app.use(cors(options));

app.use(bodyParser.json());

app.use('/auth', authRoutes);

export default app;
