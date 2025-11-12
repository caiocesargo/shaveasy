import { Router } from 'express';
// CORREÇÃO: Importamos o controller com o nome 'agendamentoController' em minúsculo,
// conforme o que está sendo exportado como default no controller.
import agendamentoController from './agendamento.controller.js'; 
import { verifyJWT } from '../../shared/middlewares/verifyJWT.js'; 

const router = Router();

// PREFIXO: /agendamento (Definido no server.js)

// [C]REATE: Cria um novo agendamento. Rota completa: POST /agendamento/criar
// Usa agendamentoController.create, que foi corrigido para existir no controller.
router.post(
    '/criar',
    verifyJWT,
    agendamentoController.create
);

// [R]EAD: Lista agendamentos do cliente logado. Rota completa: GET /agendamento/meus
// Usa agendamentoController.list, que foi corrigido para existir no controller.
router.get(
    '/meus', 
    verifyJWT,
    agendamentoController.list
);

export default router;