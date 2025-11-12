import barbeariaService from "./barbearia.service.js";

class BarbeariaController {
    async criarBarbearia(req, res) {
        const { nome, endereco, telefone } = req.body;

        const userIdDono = req.user.userId;

        if (!nome || !endereco || !telefone) {
            return res.status(400).json({ error: 'Nome, endereço e telefone são obrigatorios.' });
        }

        try {
            if (req.user.barbeariaId) {
                return res.status(403).json({ error: 'Este usuario ja está vinculado á uma barbearia.' });
            }

            const { novaBarbearia, dono } = await barbeariaService.criar(
                { nome, endereco, telefone },
                userIdDono
            );
            return res.status(201).json({ barbearia: novaBarbearia, dono: dono });
        } catch (error) {
            console.error("Erro ao criar barbearia: ", error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}

export default new BarbeariaController();