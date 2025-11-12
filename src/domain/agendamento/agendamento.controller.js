// src/domain/agendamento/agendamento.controller.js
import AgendamentoService from './agendamento.service.js';

class AgendamentoController {

    // --- CRUD de Serviços (Concluído) ---
    // Métodos antigos que o colega usou para Services - Vamos deixá-los como estão
    async criarServico(req, res) {
        // ... (lógica anterior)
    }

    async listarServicos(req, res) {
        // ... (lógica anterior)
    }
    
    // --- ROTA DE AGENDAMENTO (CRIAR) ---
    // CORREÇÃO: Renomeado de 'criarAgendamento' para 'create'
    async create(req, res) { // <-- AGORA SE CHAMA 'create'
        const { userId: clienteId } = req.user; 
        const { servicoId, barbeiroId, dataHora } = req.body;

        if (!servicoId || !barbeiroId || !dataHora) {
            return res.status(400).json({ error: 'Serviço, barbeiro e data/hora são obrigatórios.' });
        }
        
        try {
            const agendamento = await AgendamentoService.criarAgendamento(
                req.body,
                clienteId 
            );
            
            return res.status(201).json(agendamento);

        } catch (error) {
            if (error.message.includes('Horário indisponível')) {
                return res.status(409).json({ error: error.message }); 
            }
            if (error.message.includes('Serviço não encontrado')) {
                return res.status(404).json({ error: error.message }); 
            }
            console.error('Erro ao criar agendamento:', error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
    
    // --- ROTA DE AGENDAMENTO (LISTAR) ---
    // CORREÇÃO: Renomeado de 'listarAgendamento' para 'list'
    async list(req, res) { // <-- AGORA SE CHAMA 'list'
        try {
            const agendamentos = await AgendamentoService.listarAgendamentos(req.user.userId);
            return res.status(200).json(agendamentos);
        } catch (error) {
            console.error('Erro ao listar agendamentos:', error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}

export default new AgendamentoController();