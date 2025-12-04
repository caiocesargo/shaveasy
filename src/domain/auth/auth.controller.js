// src/domain/auth/auth.controller.js

import AuthService from './auth.service.js';

class AuthController {
    
    async register(req, res) {
        const { nome, email, password, telefone, tipo } = req.body;

        // Regra de Negócio: Todos os campos são obrigatórios (Estória de Usuário)
        if (!nome || !email || !password || !telefone) {
            return res.status(400).json({ error: 'Todos os campos (nome, e-mail, senha, telefone) são obrigatórios.' });
        }
        const dadosRegistro = { nome, email, password, telefone };
        
        try {
            const usuario = await AuthService.registrarUsuario(dadosRegistro, tipo);

            // Critério de Aceite: Mensagem de sucesso (Estória de Usuário)
            return res.status(201).json({ 
                message: 'Cadastro realizado com sucesso!', 
                user: usuario 
            });

        } catch (error) {
            // Trata o erro de Conflito (email duplicado)
            if (error.message.includes('registrado')) {
                return res.status(409).json({ error: error.message });
            }
            console.error('Erro no registro:', error);
            return res.status(500).json({ error: 'Erro interno ao tentar cadastrar usuário.' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios.'});
        }
        try {
            // Chama o método 'fazerLogin'
            const { token, user } = await AuthService.fazerLogin(email, password);

            // Critério de Aceite: Autenticar o usuário
            return res.status(200).json({
                message: 'Login Realizado com sucesso.',
                token: token,
                user: user
            });
        } catch (error) {
            // Trata o erro 'Credenciais inválidas'
            if (error.message.includes('Credenciais')) {
                return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
            }
            console.error('Erro no login', error);
            return res.status(500).json({ error: 'Erro interno ao tenta logar.' });
        }
    }

    async perfil(req, res) {
        try {
            const userId = req.user.userId;

            const usuario = await AuthService.getPerfil(userId);

            return res.status(200).json(usuario);
        } catch (error) {
            if (error.message.includes('não encontrado')){
                return res.status(404).json({ error: error.message })
            }
            console.error('Erro ao buscar perfil.', error);
            return res.status(500).json({error: 'Erro interno ao buscar perfil.'});
        }
    }

    async meusAgendamentos(req, res) {
        try {
            const userIdCliente = req.user.userId;
            const agendamentos = await AuthService.getMeusAgendamentos(userIdCliente);

            return res.status(200).json(agendamentos);

        } catch (error) {
            console.error('Erro ao buscar agendamentos', error);
            return res.status(500).json({ error: 'Erro interno ao buscar agendamentos.' });
        }
    }
    async listarBarbeiros(req, res) {
        const barbeariaId = req.user.barbeariaId;

        if (!barbeariaId) {
            return res.status(403).json({ error: 'Usuário não vinculado à barbearia.' });
        }

        try {
            const barbeiros = await AuthService.listarBarbeiros(barbeariaId);
            return res.status(200).json(barbeiros);
        } catch (error) {
            console.error('Erro ao listar barbeiros:', error);
            return res.status(500).json({ error: 'Erro interno no servidor ao listar barbeiros.' });
        }
    }

    async atualizarBarbeiro(req, res) {
        const { id } = req.params;
        const { nome, especialidade, telefone, email } = req.body;
        const barbeariaId = req.user.barbeariaId;

        try {
            const barbeiro = await AuthService.atualizarBarbeiro(
                id, 
                { nome, especialidade, telefone, email }, 
                barbeariaId
            );
            return res.status(200).json({
                message: 'Barbeiro atualizado com sucesso!',
                barbeiro: barbeiro
            });
        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ error: error.message });
            }
            console.error('Erro ao atualizar barbeiro:', error);
            return res.status(500).json({ error: 'Erro interno ao atualizar barbeiro.' });
        }
    }

    async excluirBarbeiro(req, res) {
        const { id } = req.params;
        const barbeariaId = req.user.barbeariaId;

        try {
            await AuthService.excluirBarbeiro(id, barbeariaId);
            return res.status(204).send();
        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ error: error.message });
            }
            console.error('Erro ao excluir barbeiro:', error);
            return res.status(500).json({ error: 'Erro interno ao excluir barbeiro.' });
        }
    }
}

export default new AuthController();