import servicoService from "./servico.service.js";

class ServicoController {

    // POST /servicos
    async create(req, res) {
        // Campos esperados: nome, preco, duracao_min
        const { nome, preco, duracao_min } = req.body;
        const barbeariaId = req.user.barbeariaId; // ID da barbearia do Admin/Dono

        if (!barbeariaId) {
            return res.status(403).json({ error: 'Usuário não está vinculado a uma barbearia.' });
        }
        if (!nome || !preco || !duracao_min) {
            return res.status(400).json({ error: 'Nome, preço e duração são obrigatórios.' });
        }

        try {
            const novoServico = await servicoService.create(
                { nome, preco, duracao_min },
                barbeariaId
            );
            return res.status(201).json(novoServico);
        } catch (error) {
            console.error("Erro ao criar serviço: ", error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }

    // GET /servicos
    async list(req, res) {
        const barbeariaId = req.user.barbeariaId; // ID da barbearia do Admin/Dono

        if (!barbeariaId) {
            // Se o usuário não tem barbeariaId (ex: cliente comum), ele não deve ver o catálogo
            return res.status(403).json({ error: 'Acesso negado. Usuário sem vínculo com barbearia.' });
        }

        try {
            const servicos = await servicoService.list(barbeariaId);
            return res.status(200).json(servicos);
        } catch (error) {
            console.error("Erro ao listar serviços: ", error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }

    // PUT /servicos/:id
    async update(req, res) {
        const { id } = req.params; // ID do serviço a atualizar
        const { nome, preco, duracao_min } = req.body; // Novos dados
        const barbeariaId = req.user.barbeariaId; // ID da barbearia do Admin/Dono

        if (!barbeariaId) {
            return res.status(403).json({ error: 'Usuário não está vinculado a uma barbearia.' });
        }

        try {
            const servico = await servicoService.update(
                id,
                { nome, preco, duracao_min },
                barbeariaId
            );
            return res.status(200).json(servico);
        } catch (error) {
            console.error("Erro ao atualizar serviço: ", error);
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }

    // DELETE /servicos/:id
    async delete(req, res) {
        const { id } = req.params; // ID do serviço a deletar
        const barbeariaId = req.user.barbeariaId; // ID da barbearia do Admin/Dono

        if (!barbeariaId) {
            return res.status(403).json({ error: 'Usuário não está vinculado a uma barbearia.' });
        }

        try {
            await servicoService.delete(id, barbeariaId);
            // Retorna HTTP 204: Sucesso, sem corpo de resposta (Padrão para DELETE)
            return res.status(204).send(); 
        } catch (error) {
            console.error("Erro ao deletar serviço: ", error);
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}

export default new ServicoController();