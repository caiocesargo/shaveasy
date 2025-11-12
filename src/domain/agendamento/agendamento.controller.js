// src/domain/agendamento/agendamento.controller.js
import AgendamentoService from './agendamento.service.js';

class AgendamentoController {

    // --- CRUD de Serviços (Concluído) ---

    async criarServico(req, res) {
        try {
            const { barbeariaId, tipo } = req.user; 
            if (tipo !== 'admin') { 
                return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem criar serviços.' });
            }
            if (!barbeariaId) {
                return res.status(400).json({ error: 'Usuário administrador não está vinculado a nenhuma barbearia.' });
            }
            const dadosServico = req.body;
            const servico = await AgendamentoService.criarServico(dadosServico, barbeariaId);
            res.status(201).json(servico);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async listarServicos(req, res) {
        try {
            const { barbeariaId } = req.user; 
            if (!barbeariaId) {
                return res.status(400).json({ error: 'Usuário não está vinculado a nenhuma barbearia.' });
            }
            const servicos = await AgendamentoService.listarServicos(barbeariaId);
            res.status(200).json(servicos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // =======================================================
    // || NOVA FUNÇÃO (COM A LÓGICA CORRIGIDA) ||
    // =======================================================
    async criarAgendamento(req, res) {
        // IDs que vêm do Token (do middleware do João)
        const { userId: clienteId } = req.user; // <-- CORREÇÃO: SÓ PRECISAMOS DO CLIENTE ID
        
        // IDs que vêm do Body (do app React Native)
        const { servicoId, barbeiroId, dataHora } = req.body;

        if (!servicoId || !barbeiroId || !dataHora) {
            return res.status(400).json({ error: 'Serviço, barbeiro e data/hora são obrigatórios.' });
        }
        
        // (CORREÇÃO: A verificação "if (!barbeariaId)" foi removida daqui)

        try {
            const agendamento = await AgendamentoService.criarAgendamento(
                req.body,
                clienteId // <-- CORREÇÃO: SÓ PASSAMOS O clienteId
            );
            
            return res.status(201).json(agendamento);

        } catch (error) {
            // Trata o erro de Anti-Double Booking
            if (error.message.includes('Horário indisponível')) {
                return res.status(409).json({ error: error.message }); // 409 Conflito
            }
             // Trata o erro de Serviço Não Encontrado
            if (error.message.includes('Serviço não encontrado')) {
                return res.status(404).json({ error: error.message }); // 404 Não Encontrado
            }
            console.error('Erro ao criar agendamento:', error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}

export default new AgendamentoController();