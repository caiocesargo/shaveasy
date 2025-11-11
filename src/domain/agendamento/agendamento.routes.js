// src/domain/agendamento/agendamento.routes.js
import { Router } from 'express';
import AgendamentoController from './agendamento.controller.js';

// 1. IMPORTAR O MIDDLEWARE DO JOÃO
import { verifyJWT } from '../../shared/middlewares/verifyJWT.js';

const router = Router();

// --- Rotas de Serviços ---
// 2. APLICAR O MIDDLEWARE (verifyJWT)
router.post('/servicos', verifyJWT, AgendamentoController.criarServico);
router.get('/servicos', verifyJWT, AgendamentoController.listarServicos);

// (A rota de debug foi removida)

export default router;