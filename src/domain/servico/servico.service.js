// Importa o cliente Prisma
import prisma from '../../config/prisma.js'; 

class ServicoService {

    // Cria um novo serviço
    async create(data, barbeariaId) {
        const { nome, preco, duracao_min } = data;
        
        return prisma.servico.create({
            data: {
                nome,
                // Garante a conversão para os tipos corretos no DB
                preco: parseFloat(preco), 
                duracao_min: parseInt(duracao_min), 
                barbeariaId: barbeariaId, // Vínculo de Multi-Tenancy
            }
        });
    }

    // Lista todos os serviços, filtrando pelo ID da barbearia
    async list(barbeariaId) {
        return prisma.servico.findMany({
            where: {
                barbeariaId: barbeariaId
            },
            // Ordena por nome para facilitar a visualização
            orderBy: {
                nome: 'asc'
            }
        });
    }

    // Atualiza um serviço existente
    async update(id, data, barbeariaId) {
        // 1. Checa a segurança: O serviço deve existir E pertencer à barbearia
        const servicoExistente = await prisma.servico.findFirst({
            where: {
                id: id,
                barbeariaId: barbeariaId 
            }
        });

        if (!servicoExistente) {
            throw new Error('Serviço não encontrado ou não pertence a esta barbearia.');
        }

        // 2. Realiza a atualização
        return prisma.servico.update({
            where: {
                id: id
            },
            data: {
                nome: data.nome,
                // Converte para Float/Int apenas se o valor for fornecido no body
                preco: data.preco ? parseFloat(data.preco) : undefined,
                duracao_min: data.duracao_min ? parseInt(data.duracao_min) : undefined,
            }
        });
    }

    // Deleta um serviço
    async delete(id, barbeariaId) {
         // 1. Checa a segurança: O serviço deve existir E pertencer à barbearia
         const servicoExistente = await prisma.servico.findFirst({
            where: {
                id: id,
                barbeariaId: barbeariaId 
            }
        });

        if (!servicoExistente) {
            throw new Error('Serviço não encontrado ou não pertence a esta barbearia.');
        }

        // 2. Realiza a exclusão
        return prisma.servico.delete({
            where: {
                id: id
            }
        });
    }
}

export default new ServicoService();