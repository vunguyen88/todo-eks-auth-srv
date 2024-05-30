// src/routes/authRoutes.ts
import express from 'express';
import { register, login, MFALogin } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', MFALogin);

export default router;
