// src/domain/agendamento/agendamento.controller.js
import AgendamentoService from './agendamento.service.js';

class AgendamentoController {

    // --- Serviços ---

    async criarServico(req, res) {
        try {
            // TODO: Aplicar Multi-Tenancy. Pegar o barbeariaId do token (req.user.barbeariaId)
            // const barbeariaId = req.user.barbeariaId; 
            
            // (Simulação por enquanto, já que não temos o token)
            // IMPORTANTE: Este ID será pego no Passo 4 (Teste)
            const barbeariaId = "9ebc6e18-2371-48e3-8979-8d5c52f22541"; // Substitua por um ID real

            const dadosServico = req.body; // { nome, preco, duracao_min }
            
            const servico = await AgendamentoService.criarServico(dadosServico, barbeariaId);
            
            res.status(201).json(servico);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async listarServicos(req, res) {
        try {
            // TODO: Aplicar Multi-Tenancy. Pegar o barbeariaId do token (req.user.barbeariaId)
            // const barbeariaId = req.user.barbeariaId;

            // (Simulação por enquanto)
            const barbeariaId = "9ebc6e18-2371-48e3-8979-8d5c52f22541"; // Substitua pelo mesmo ID

            const servicos = await AgendamentoService.listarServicos(barbeariaId);
            res.status(200).json(servicos);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // --- ROTA DE DEBUG (Para contornar o erro do PgAdmin) ---
    async criarBarbeariaTeste(req, res) {
        try {
            // Esta função chama o service para criar a barbearia via Prisma Client
            const barbearia = await AgendamentoService.criarBarbeariaTeste(req.body);
            res.status(201).json(barbearia);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new AgendamentoController();