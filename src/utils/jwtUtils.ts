// src/utils/jwtUtils.ts
require('dotenv').config();
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'test';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '24h' });
};

export const verifyToken = (token: string): string | object => {
  return jwt.verify(token, secretKey);
};
