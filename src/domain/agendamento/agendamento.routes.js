import { Router } from 'express';
import agendamentoController from './agendamento.controller.js'; 
import { verifyJWT } from '../../shared/middlewares/verifyJWT.js'; 

const router = Router();

// PREFIXO: /agendamento (Definido no server.js)

// --- ROTAS DE CLIENTES ---

// [C]REATE: Cria um novo agendamento. Rota completa: POST /agendamento/criar
router.post(
    '/criar',
    verifyJWT,
    agendamentoController.create
);

// [R]EAD: Lista agendamentos do cliente logado. Rota completa: GET /agendamento/meus
router.get(
    '/meus', 
    verifyJWT,
    agendamentoController.list
);

// [R]EAD (CORREÇÃO URGENTE): Lista serviços de uma barbearia específica.
// O :barbeariaId na URL permite ao cliente escolher qual barbearia ver
router.get(
    '/servicos/barbearia/:barbeariaId', // <-- Rota corrigida
    verifyJWT, 
    agendamentoController.listarServicos
);

router.get(
    '/confirmados/barbearia/:barbeariaId', 
    verifyJWT,
    agendamentoController.listarAgendamentosConfirmados // <-- Estória: Visualização de Agendamentos (Barbearia)
);

// --- ROTAS DE GESTÃO (ADMIN/BARBEIRO) ---

// [R]EAD (ADMIN/BARBEIRO): Lista a agenda da barbearia. Rota completa: GET /agendamento/agenda
router.get(
    '/agenda', 
    verifyJWT,
    agendamentoController.getAgenda // <-- Estória 8 (Visualização)
);

// [U]PDATE: Cancelamento de agendamento (Cliente ou Admin/Barbeiro). Rota completa: PUT /agendamento/cancelar/:id
router.put(
    '/cancelar/:id',
    verifyJWT,
    agendamentoController.cancelarAgendamento // <-- Estória 8 (Cancelamento)
);

export default router;