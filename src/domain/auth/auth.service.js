// src/domain/auth/auth.service.js

import bcrypt from 'bcryptjs';
import { prisma } from '../../config/prisma.js'; // Importa a instância do Prisma

class AuthService {

    /**
     * Registra um novo CLIENTE no sistema.
     * Requisitos: Nome, E-mail, Telefone e Senha (Estória de Usuário)
     */
    async registrarCliente(dadosRegistro) {
        const { nome, email, password, telefone } = dadosRegistro;

        // 1. Verificar se o usuário já existe
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email: email },
        });

        if (usuarioExistente) {
            throw new Error('Usuário já registrado com este e-mail.'); 
        }

        // 2. Criptografia (Bcrypt) - O mínimo aceitável (fator 10)
        const senhaHash = await bcrypt.hash(password, 10);

        // 3. Salvar no PostgreSQL via Prisma
        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                telefone,
                senha_hash: senhaHash, // Salva o HASH!
                tipo: 'cliente',       // Padrão para esta rota
            },
            // Nunca retorne a senha_hash
            select: { id: true, nome: true, email: true, tipo: true }, 
        });

        return novoUsuario;
    }
}

export default new AuthService();