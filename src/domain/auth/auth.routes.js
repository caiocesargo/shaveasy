import { Router } from 'express';
// O nome da variável importada é 'authControllerInstance'
import authControllerInstance from './auth.controller.js';
import { verifyJWT } from '../../shared/middlewares/verifyJWT.js';


const router = Router();
const authController = authControllerInstance;

router.post('/register', authController.register); 
router.post('/login', authController.login)

router.get('/perfil', verifyJWT, authController.perfil);

export default router;