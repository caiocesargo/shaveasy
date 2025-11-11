// src/domain/agendamento/agendamento.controller.js
import AgendamentoService from './agendamento.service.js';

class AgendamentoController {

    async criarServico(req, res) {
        try {
            // 1. DADOS VINDOS DO TOKEN (EM VEZ DO ID FIXO)
            const { barbeariaId, tipo } = req.user; 

            // 2. REGRA DE SEGURANÇA (Multi-Tenancy)
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
            // 1. DADOS VINDOS DO TOKEN
            const { barbeariaId } = req.user; // <-- DADOS DO TOKEN
            if (!barbeariaId) {
                return res.status(400).json({ error: 'Usuário não está vinculado a nenhuma barbearia.' });
            }
            const servicos = await AgendamentoService.listarServicos(barbeariaId);
            res.status(200).json(servicos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // A função criarBarbeariaTeste foi removida, 
    // pois a rota /barbearias (do João) a substitui.
}

export default new AgendamentoController();