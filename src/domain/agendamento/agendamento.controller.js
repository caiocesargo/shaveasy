// src/domain/agendamento/agendamento.controller.js
import AgendamentoService from './agendamento.service.js';

class AgendamentoController {

    // --- CRUD de Serviços (Concluído) ---
    
    // Método para a criação de serviços (Admin/Barbeiro)
    async criarServico(req, res) {
        const { barbeariaId } = req.user; 
        const dadosServico = req.body;

        if (!barbeariaId) {
            return res.status(403).json({ error: 'Usuário não vinculado a uma barbearia.' });
        }

        try {
            const servico = await AgendamentoService.criarServico(dadosServico, barbeariaId);
            return res.status(201).json(servico);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // =======================================================
    // || CORREÇÃO URGENTE: listarServicos (CLIENTE) ||
    // =======================================================
    async listarServicos(req, res) { // <-- MÉTODO CORRIGIDO
        try {
            // CORREÇÃO: Pega o ID da URL, não do token.
            const { barbeariaId } = req.params; 

            if (!barbeariaId) {
                return res.status(400).json({ error: 'O ID da barbearia é obrigatório na URL.' });
            }
            
            const servicos = await AgendamentoService.listarServicos(barbeariaId);
            return res.status(200).json(servicos);

        } catch (error) {
            console.error('Erro ao listar serviços:', error);
            return res.status(500).json({ error: 'Erro interno ao buscar serviços.' });
        }
    }
    
    // --- ROTA DE AGENDAMENTO (CRIAR) ---
    async create(req, res) { 
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
    
    // --- ROTA DE AGENDAMENTO (LISTAR CLIENTE) ---
    async list(req, res) { 
        try {
            const agendamentos = await AgendamentoService.listarAgendamentos(req.user.userId);
            return res.status(200).json(agendamentos);
        } catch (error) {
            console.error('Erro ao listar agendamentos:', error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }

    // =======================================================
    // || NOVO: Estória 8 (Agenda do Barbeiro) ||
    // =======================================================

    // --- ROTA DE AGENDAMENTO (AGENDA DO BARBEIRO - READ) ---
    async getAgenda(req, res) { // <-- NOVO MÉTODO
        const { barbeariaId } = req.user; 

        if (!barbeariaId) {
            return res.status(403).json({ error: 'Acesso negado. Usuário não associado a uma barbearia.' });
        }

        try {
            const agenda = await AgendamentoService.obterAgendaDaBarbearia(barbeariaId);
            return res.status(200).json(agenda);
        } catch (error) {
            console.error('Erro ao listar agenda da barbearia:', error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }

    // --- ROTA DE AGENDAMENTO (CANCELAR - UPDATE) ---
    async cancelarAgendamento(req, res) { // <-- NOVO MÉTODO
        const { id: agendamentoId } = req.params;
        const { userId, barbeariaId, tipo } = req.user; 

        try {
            const agendamentoCancelado = await AgendamentoService.cancelar(
                agendamentoId,
                userId,
                barbeariaId,
                tipo
            );

            return res.status(200).json({ 
                message: 'Agendamento cancelado com sucesso.', 
                agendamento: agendamentoCancelado 
            });

        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ error: error.message }); 
            }
            if (error.message.includes('não autorizado')) {
                return res.status(403).json({ error: error.message }); 
            }
            console.error('Erro ao cancelar agendamento:', error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}

export default new AgendamentoController();