// src/domain/auth/auth.routes.js

import { Router } from 'express';
// O nome da variável importada é 'authControllerInstance' para ficar mais claro
import authControllerInstance from './auth.controller.js';

const router = Router();

// NÃO usamos 'new' aqui. Usamos a instância que já foi importada.
// Esta é a correção do bug.
const authController = authControllerInstance;

// As rotas agora usam os métodos da instância importada
router.post('/register', authController.register); 

export default router;