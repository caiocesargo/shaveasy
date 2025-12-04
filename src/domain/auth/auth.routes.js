import { Router } from 'express';
// O nome da variável importada é 'authControllerInstance'
import authControllerInstance from './auth.controller.js';
import { verifyJWT, verifyClient, verifyBarbeiro } from '../../shared/middlewares/verifyJWT.js';


const router = Router();
const authController = authControllerInstance;

// Rotas públicas
router.post('/register', authController.register); 
router.post('/login', authController.login)

// Rotas protegidas
router.get('/perfil', verifyJWT, authController.perfil);

// Rota específica para clientes
router.get('/meus-agendamentos', verifyJWT, verifyClient, authController.meusAgendamentos);

// Rotas específicas para admins gerenciarem barbeiros
router.get('/barbeiros', verifyJWT, verifyBarbeiro, authController.listarBarbeiros);
router.put('/barbeiros/:id', verifyJWT, verifyBarbeiro, authController.atualizarBarbeiro);
router.delete('/barbeiros/:id', verifyJWT, verifyBarbeiro, authController.excluirBarbeiro);

export default router;