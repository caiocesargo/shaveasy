// src/domain/auth/auth.service.js

import bcrypt from 'bcryptjs';
import prisma from '../../config/prisma.js';
import jwt from 'jsonwebtoken';


class AuthService {
    /**
     * Registra um novo usuário no sistema (genérico)
     * Pode ser usado para criar tanto clientes quanto admins
     */
    async registrarUsuario(dadosRegistro, tipo) {
        const { nome, email, password, telefone, barbeariaId, especialidade } = dadosRegistro;

        // 1. Verificar se o usuário já existe
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email },
        });

        if (usuarioExistente) {
            throw new Error('Usuário já registrado com este e-mail.'); 
        }

        // 2. Validar tipo de usuário
        if (!['cliente', 'barbeiro'].includes(tipo)) {
            throw new Error('Tipo de usuário inválido. Use "cliente" ou "barbeiro".');
        }

        // 3. Se for barbeiro, deve ter barbeariaId
        if (tipo === 'barbeiro' && !barbeariaId) {
            throw new Error('Admin deve estar associado a uma barbearia.');
        }

        // 4. Criptografia (Bcrypt) - apenas se tiver senha
        const senhaHash = password ? await bcrypt.hash(password, 10) : null;

        // 5. Salvar no PostgreSQL via Prisma
        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                telefone,
                senha_hash: senhaHash,
                tipo,
                especialidade: tipo === 'barbeiro' ? especialidade : null,
                barbeariaId: tipo === 'barbeiro' ? barbeariaId : null,
            },
            // Nunca retorne a senha_hash
            select: { 
                id: true, 
                nome: true, 
                email: true, 
                tipo: true, 
                especialidade: true,
                barbeariaId: true 
            }, 
        });

        return novoUsuario;
    }
    async fazerLogin(email, password) {
        const usuario = await prisma.usuario.findUnique({
            where: { email: email },
            include: {
                barbearia: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        });

        if (!usuario) {
            throw new Error('Credenciais inválidas.')
        }

        const senhaValida = await bcrypt.compare(password, usuario.senha_hash);
        if (!senhaValida) {
            throw new Error('Credenciais inválidas');
        }

        // Payload do token (informações essenciais)
        const payload = {
            userId: usuario.id,
            tipo: usuario.tipo,
            barbeariaId: usuario.barbeariaId || null
        };

        // Informações completas do usuário (para retornar ao frontend)
        const userInfo = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo,
            especialidade: usuario.especialidade,
            barbeariaId: usuario.barbeariaId,
            barbearia: usuario.barbearia
        };

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return { token, user: userInfo };
    }

    async getPerfil(userId) {
        const usuario = await prisma.usuario.findUnique({
            where: { id: userId },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                tipo: true,
                especialidade: true,
                barbeariaId: true
            }
        });
        
        if (!usuario){
            throw new Error('Usuário não encontrado.');
        }

        return usuario;
    }

    async getMeusAgendamentos(userIdCliente) {
        const agendamentos = await prisma.agendamento.findMany({
            where: {
            clienteId: userIdCliente,
            dataHora: {
                gte: new Date ()
            }
        },
        orderBy: {
            dataHora: 'asc'
        },

        include: {
            servico: {
                select: { nome: true, preco: true, duracao_min: true }
            },
            barbeiro: {
                select: { nome: true }
            }
        }
        });
        return agendamentos;
    }

    /**
     * Métodos para gerenciar barbeiros (migrados do domínio barbeiro)
     */
    async listarBarbeiros(barbeariaId) {
        return await prisma.usuario.findMany({
            where: {
                barbeariaId: barbeariaId,
                tipo: 'admin'
            },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                especialidade: true,
                barbeariaId: true
            },
            orderBy: {
                nome: 'asc'
            }
        });
    }

    async atualizarBarbeiro(barbeiroId, dadosAtualizacao, barbeariaId) {
        const barbeiroExistente = await prisma.usuario.findFirst({
            where: { 
                id: barbeiroId, 
                barbeariaId: barbeariaId,
                tipo: 'admin'
            }
        });

        if (!barbeiroExistente) {
            throw new Error('Barbeiro não encontrado ou não pertence a esta barbearia.');
        }

        return await prisma.usuario.update({
            where: { id: barbeiroId },
            data: {
                nome: dadosAtualizacao.nome,
                especialidade: dadosAtualizacao.especialidade,
                telefone: dadosAtualizacao.telefone,
                email: dadosAtualizacao.email
            },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                especialidade: true,
                barbeariaId: true
            }
        });
    }

    async excluirBarbeiro(barbeiroId, barbeariaId) {
        const barbeiroExistente = await prisma.usuario.findFirst({
            where: { 
                id: barbeiroId, 
                barbeariaId: barbeariaId,
                tipo: 'admin'
            }
        });

        if (!barbeiroExistente) {
            throw new Error('Barbeiro não encontrado ou não pertence a esta barbearia.');
        }

        return await prisma.usuario.delete({
            where: { id: barbeiroId }
        });
    }

    /**
     * Permite que um barbeiro defina sua primeira senha
     */
    async definirSenhaBarbeiro(email, novaSenha) {
        const barbeiro = await prisma.usuario.findUnique({
            where: { email: email }
        });

        if (!barbeiro) {
            throw new Error('Barbeiro não encontrado.');
        }

        if (barbeiro.tipo !== 'admin') {
            throw new Error('Apenas barbeiros podem usar esta função.');
        }

        if (barbeiro.senha_hash) {
            throw new Error('Barbeiro já possui senha definida. Use a função de redefinir senha.');
        }

        const senhaHash = await bcrypt.hash(novaSenha, 10);

        const barbeiroAtualizado = await prisma.usuario.update({
            where: { id: barbeiro.id },
            data: { senha_hash: senhaHash },
            select: {
                id: true,
                nome: true,
                email: true,
                tipo: true,
                especialidade: true,
                barbeariaId: true
            }
        });

        return barbeiroAtualizado;
    }
}



export default new AuthService();