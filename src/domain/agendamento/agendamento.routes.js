// src/domain/agendamento/agendamento.routes.js
import { Router } from 'express';
import AgendamentoController from './agendamento.controller.js';
// (TODO: Importar o middleware verifyJWT quando o João o entregar)

const router = Router();

// --- Rotas de Serviços ---
// (Regra de Negócio: Gerenciamento de Serviços)
router.post('/servicos', AgendamentoController.criarServico);
router.get('/servicos', AgendamentoController.listarServicos);

// --- ROTA DE DEBUG (Para contornar o erro do PgAdmin) ---
// Rota para criar uma barbearia de teste (já que o PgAdmin falhou)
router.post('/debug-criar-barbearia', AgendamentoController.criarBarbeariaTeste);

// --- Rotas de Barbeiros (Exemplo futuro) ---
// router.post('/barbeiros', ...)

// --- Rotas de Agendamentos (Exemplo futuro) ---
// router.post('/', ...)

export default router;