// src/domain/auth/auth.routes.js

import { Router } from 'express';
import AuthController from './auth.controller.js';

const router = Router();
// Instancia o Controller (Baseado em POO)
const authController = new AuthController();

// Define a rota POST /auth/register
router.post('/register', authController.register); 

export default router;