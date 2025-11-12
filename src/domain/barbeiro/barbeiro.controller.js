import barbeiroService from "./barbeiro.service.js";

class BarbeiroController {
    // POST /barbeiros
    async create(req, res) {
        const { nome, especialidade } = req.body;
        const barbeariaId = req.user.barbeariaId; 

        if (!barbeariaId) {
            return res.status(403).json({ error: 'Usuário não vinculado à barbearia.' });
        }
        if (!nome) {
            return res.status(400).json({ error: 'Nome é obrigatório.' });
        }

        try {
            const novoBarbeiro = await barbeiroService.create({ nome, especialidade }, barbeariaId);
            return res.status(201).json(novoBarbeiro);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor ao criar barbeiro.' });
        }
    }

    // GET /barbeiros
    async list(req, res) {
        const barbeariaId = req.user.barbeariaId; 

        if (!barbeariaId) {
            return res.status(403).json({ error: 'Usuário não vinculado à barbearia.' });
        }

        try {
            const barbeiros = await barbeiroService.list(barbeariaId);
            return res.status(200).json(barbeiros);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor ao listar barbeiros.' });
        }
    }

    // PUT /barbeiros/:id
    async update(req, res) {
        const { id } = req.params;
        const { nome, especialidade } = req.body;
        const barbeariaId = req.user.barbeariaId; 

        try {
            const barbeiro = await barbeiroService.update(id, { nome, especialidade }, barbeariaId);
            return res.status(200).json(barbeiro);
        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro interno ao atualizar barbeiro.' });
        }
    }

    // DELETE /barbeiros/:id
    async delete(req, res) {
        const { id } = req.params;
        const barbeariaId = req.user.barbeariaId; 

        try {
            await barbeiroService.delete(id, barbeariaId);
            return res.status(204).send(); 
        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro interno ao deletar barbeiro.' });
        }
    }
}

export default new BarbeiroController();