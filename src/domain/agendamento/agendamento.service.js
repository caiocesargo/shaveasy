// src/domain/agendamento/agendamento.service.js
import { prisma } from '../../config/prisma.js'; // Importa o Prisma

class AgendamentoService {

    // --- Serviços ---

    async criarServico(dadosServico, barbeariaId) {
        const { nome, preco, duracao_min } = dadosServico;

        // 1. Validação de entrada (verificar se existem)
        if (!nome || !preco || !duracao_min) {
            throw new Error("Nome, preço e duração são obrigatórios.");
        }

        // 2. (CORREÇÃO do bug 'typeof' que eu (Gemini) causei)
        try {
            // Nós convertemos os dados para garantir
            // que eles correspondam ao schema.prisma (Float e Int)
            const servico = await prisma.servico.create({
                data: {
                    nome: nome,
                    preco: parseFloat(preco),           // <-- GARANTE que é um Float
                    duracao_min: parseInt(duracao_min, 10), // <-- GARANTE que é um Inteiro
                    barbeariaId: barbeariaId, // Regra de Multi-Tenancy
                }
            });

            return servico;

        } catch (e) {
            console.error("Erro ao criar serviço no Prisma:", e);
            throw new Error("Falha ao criar serviço. Verifique se preço e duração são números válidos.");
        }
    }

    async listarServicos(barbeariaId) {
        
        const servicos = await prisma.servico.findMany({
            where: {
                barbeariaId: barbeariaId, // Regra de Multi-Tenancy
            }
        });

        return servicos;
    }

    // --- ROTA DE DEBUG (Para contornar o erro do PgAdmin) ---
    // Esta função será chamada pelo nosso controller de debug
    async criarBarbeariaTeste(dadosBarbearia) {
        const { nome, endereco, telefone } = dadosBarbearia;
        if (!nome) throw new Error("Nome é obrigatório");

        // O Prisma Client VAI gerar o UUID corretamente
        // (ao contrário do PgAdmin)
        const barbearia = await prisma.barbearia.create({
            data: {
                nome: nome,
                endereco: endereco || "Endereço Teste",
                telefone: telefone || "123456",
            }
        });
        
        console.log("BARBEARIA DE TESTE CRIADA:", barbearia);
        return barbearia;
    }
}

export default new AgendamentoService();