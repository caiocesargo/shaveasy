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
    
}

export default new AuthController();