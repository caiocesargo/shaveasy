// src/domain/agendamento/agendamento.service.js
import { prisma } from '../../config/prisma.js'; // Importa o Prisma

class AgendamentoService {

    // --- CRUD de Serviços (Concluído) ---

    async criarServico(dadosServico, barbeariaId) {
        const { nome, preco, duracao_min } = dadosServico;

        if (!nome || !preco || !duracao_min) {
            throw new Error("Nome, preço e duração são obrigatórios.");
        }

        try {
            const servico = await prisma.servico.create({
                data: {
                    nome: nome,
                    preco: parseFloat(preco),           
                    duracao_min: parseInt(duracao_min, 10), 
                    barbeariaId: barbeariaId, 
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
                barbeariaId: barbeariaId, 
            }
        });
        return servicos;
    }

    // =======================================================
    // || NOVA FUNÇÃO (COM A LÓGICA CORRIGIDA) ||
    // =======================================================
    /**
     * Cria um novo agendamento, validando o Anti-Double Booking.
     * (Estória: "Agendamento de Serviços")
     */
    async criarAgendamento(dados, clienteId) { // <-- CORREÇÃO: Removido barbeariaId daqui
        const { servicoId, barbeiroId, dataHora } = dados;

        // 1. Buscar o serviço E O SEU barbeariaId
        const servico = await prisma.servico.findUnique({
            where: { id: servicoId },
            select: { duracao_min: true, barbeariaId: true } // <-- OBTÉM O ID DA BARBEARIA AQUI
        });

        if (!servico) {
            throw new Error('Serviço não encontrado.');
        }

        // Este é o ID correto
        const barbeariaIdCorreto = servico.barbeariaId;

        const dataHoraInicio = new Date(dataHora);
        // Adiciona os minutos de duração do serviço à hora de início
        const dataHoraFim = new Date(dataHoraInicio.getTime() + servico.duracao_min * 60000); 

        // 2. LÓGICA ANTI-DOUBLE BOOKING (Inalterada)
        // Regra: "O sistema deve impedir conflitos de horários"
        const conflitos = await prisma.agendamento.findMany({
            where: {
                barbeariaId: barbeiroId, // Apenas daquele barbeiro
                AND: [
                    { dataHora: { lt: dataHoraFim } },    // O início (existente) é ANTES do fim (novo)
                    { dataHoraFim: { gt: dataHoraInicio } } // O fim (existente) é DEPOIS do início (novo)
                ]
            }
        });

        if (conflitos.length > 0) {
            // Se encontrou conflitos, bloqueia o agendamento
            throw new Error('Horário indisponível. Já existe um agendamento neste período.');
        }

        // 3. Criar o agendamento
        const novoAgendamento = await prisma.agendamento.create({
            data: {
                dataHora: dataHoraInicio,
                dataHoraFim: dataHoraFim, // Salva a hora de término
                status: 'confirmado',     
                cliente: { connect: { id: clienteId } },
                barbearia: { connect: { id: barbeariaIdCorreto } }, // <-- USA O ID CORRETO
                barbeiro: { connect: { id: barbeiroId } },
                servico: { connect: { id: servicoId } },
            }
        });

        return novoAgendamento;
    }

    // A rota de debug (criarBarbeariaTeste) foi removida pois o João criou o POST /barbearias.
}

export default new AgendamentoService();