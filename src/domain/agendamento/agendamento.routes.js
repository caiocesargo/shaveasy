// src/domain/agendamento/agendamento.routes.js
import { Router } from 'express';
import AgendamentoController from './agendamento.controller.js';
import { verifyJWT } from '../../shared/middlewares/verifyJWT.js'; 

const router = Router();

// --- Rotas de Serviços (Concluídas) ---
router.post('/servicos', verifyJWT, AgendamentoController.criarServico);
router.get('/servicos', verifyJWT, AgendamentoController.listarServicos);

// --- Rota de Agendamento (NOVA E PROTEGIDA) ---
// (Estória: "Agendamento de Serviços") [cite:`uploaded:Estórias de Usuário .docx`, `uploaded:IMG-20251110-WA0025.jpg-22e80f9c-0ed0-4d52-8427-ff31a2e447a6`]
router.post('/agendamentos', verifyJWT, AgendamentoController.criarAgendamento);

export default router;