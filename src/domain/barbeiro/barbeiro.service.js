import prisma from '../../config/prisma.js'; // Linha Nova (Correta)

class BarbeiroService {

    async create(data, barbeariaId) {
        return prisma.barbeiro.create({
            data: {
                ...data,
                barbeariaId: barbeariaId,
            }
        });
    }

    async list(barbeariaId) {
        return prisma.barbeiro.findMany({
            where: {
                barbeariaId: barbeariaId
            },
            orderBy: {
                nome: 'asc'
            }
        });
    }

    async update(id, data, barbeariaId) {
        const barbeiroExistente = await prisma.barbeiro.findFirst({
            where: { id, barbeariaId }
        });

        if (!barbeiroExistente) {
            throw new Error('Barbeiro não encontrado ou não pertence a esta barbearia.');
        }

        return prisma.barbeiro.update({
            where: { id },
            data: data
        });
    }

    async delete(id, barbeariaId) {
         const barbeiroExistente = await prisma.barbeiro.findFirst({
            where: { id, barbeariaId }
        });

        if (!barbeiroExistente) {
            throw new Error('Barbeiro não encontrado ou não pertence a esta barbearia.');
        }

        return prisma.barbeiro.delete({
            where: { id }
        });
    }
}

export default new BarbeiroService();