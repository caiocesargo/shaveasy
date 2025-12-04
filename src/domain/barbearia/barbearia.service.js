import prisma from '../../config/prisma.js'; // PELA LINHA CORRETA

class BarbeariaService {

    async criar(dadosBarbearia, userIdDono) {
        const resultado = await prisma.$transaction(async (tx) => {

            // 1. Criar a Barbearia
            const novaBarbearia = await tx.barbearia.create({
                data: {
                    nome: dadosBarbearia.nome,
                    endereco: dadosBarbearia.endereco,
                    telefone: dadosBarbearia.telefone,
                }
            });
            const donoAtualizado = await tx.usuario.update({
                where: { id: userIdDono },
                data: {
                    tipo: 'barbeiro',
                    barbeariaId: novaBarbearia.id
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    tipo: true,
                    barbeariaId: true
                }
            });
            return { novaBarbearia, dono: donoAtualizado };
        });

        return resultado;
    }
    async getBarbearia() {
        const barbearia = await prisma.barbearia.findFirst({
            include: {
                servicos: true,
            }
        });
        return barbearia;
    }
}

export default new BarbeariaService();