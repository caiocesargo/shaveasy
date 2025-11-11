// src/domain/auth/auth.controller.js

import AuthService from './auth.service.js';

class AuthController {
    
    async register(req, res) {
        const { nome, email, password, telefone } = req.body;

        // Regra de Negócio: Todos os campos são obrigatórios (Estória de Usuário)
        if (!nome || !email || !password || !telefone) {
            return res.status(400).json({ error: 'Todos os campos (nome, e-mail, senha, telefone) são obrigatórios.' });
        }
        
        try {
            const usuario = await AuthService.registrarCliente({ nome, email, password, telefone });

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
    
}

export default new AuthController();