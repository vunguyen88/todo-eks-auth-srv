import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/authRoutes';

const app = express();

const allowedOrigins = '*';
const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cors(options));

app.use(bodyParser.json());

app.use('/auth', authRoutes);

export default app;
