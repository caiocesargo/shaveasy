// src/domain/agendamento/agendamento.service.js
import prisma from '../../config/prisma.js'; 

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

    // Usado pelo Admin/Barbeiro e pelo Cliente (rota corrigida)
    async listarServicos(barbeariaId) {
        const servicos = await prisma.servico.findMany({
            where: {
                barbeariaId: barbeariaId, 
            }
        });
        return servicos;
    }

    // =======================================================
    // || Agendamento e Anti-Double Booking (Concluído) ||
    // =======================================================

    /**
     * Cria um novo agendamento, validando o Anti-Double Booking.
     * (Estória: "Agendamento de Serviços")
     */
    async criarAgendamento(dados, clienteId) { 
        const { servicoId, barbeiroId, dataHora } = dados;

        // 1. Buscar o serviço E O SEU barbeariaId (para Multi-Tenancy)
        const servico = await prisma.servico.findUnique({
            where: { id: servicoId },
            select: { duracao_min: true, barbeariaId: true } 
        });

        if (!servico) {
            throw new Error('Serviço não encontrado.');
        }

        const barbeariaIdCorreto = servico.barbeariaId;

        const dataHoraInicio = new Date(dataHora);
        const dataHoraFim = new Date(dataHoraInicio.getTime() + servico.duracao_min * 60000); 

        // 2. LÓGICA ANTI-DOUBLE BOOKING
        const conflitos = await prisma.agendamento.findMany({
            where: {
                barbeiroId: barbeiroId, // Apenas daquele barbeiro
                AND: [
                    { dataHora: { lt: dataHoraFim } },    
                    { dataHoraFim: { gt: dataHoraInicio } } 
                ]
            }
        });

        if (conflitos.length > 0) {
            throw new Error('Horário indisponível. Já existe um agendamento neste período.');
        }

        // 3. Criar o agendamento
        const novoAgendamento = await prisma.agendamento.create({
            data: {
                dataHora: dataHoraInicio,
                dataHoraFim: dataHoraFim, 
                status: 'confirmado',     
                cliente: { connect: { id: clienteId } },
                barbearia: { connect: { id: barbeariaIdCorreto } }, 
                barbeiro: { connect: { id: barbeiroId } },
                servico: { connect: { id: servicoId } },
            }
        });

        return novoAgendamento;
    }

    /**
     * Lista agendamentos do cliente.
     * (Estória: "Visualização de Agendamentos (Cliente)")
     */
    async listarAgendamentos(clienteId) {
        const agendamentos = await prisma.agendamento.findMany({
            where: {
                clienteId: clienteId
            },
            include: {
                barbeiro: { select: { nome: true } },
                servico: { select: { nome: true } },
                barbearia: { select: { nome: true } }
            },
            orderBy: {
                dataHora: 'desc' 
            }
        });
        return agendamentos;
    }
    /**
     * Lista agendamentos confirmados para uma barbearia específica.
     * (Estória: "Visualização de Agendamentos (Barbearia)")
     */

    async listarAgendamentosConfirmados(barbeariaId) {
        const agendamentos = await prisma.agendamento.findMany({
            where: {
                barbeariaId: barbeariaId,
                status: 'confirmado'
            },
            include: {
                cliente: { select: { nome: true, telefone: true } },
                barbeiro: { select: { nome: true } },
                servico: { select: { nome: true } }
            },
            orderBy: {
                dataHora: 'asc' 
            }
        });
        return agendamentos;
    }


    // =======================================================
    // || NOVO: Estória 8 (Agenda do Barbeiro) ||
    // =======================================================
    
    /**
     * Lista todos os agendamentos futuros para uma barbearia específica.
     * (Estória: "Agenda do Barbeiro" - Visualização)
     */
    async obterAgendaDaBarbearia(barbeariaId) { 
        const dataAtual = new Date();
        
        const agenda = await prisma.agendamento.findMany({
            where: {
                barbeariaId: barbeariaId,
                dataHora: {
                    gte: dataAtual 
                }
            },
            include: {
                cliente: { select: { nome: true, telefone: true } },
                barbeiro: { select: { nome: true } },
                servico: { select: { nome: true, duracao_min: true } }
            },
            orderBy: {
                dataHora: 'asc' 
            }
        });
        return agenda;
    }

    /**
     * Cancela um agendamento com validação de autorização.
     * (Estória: "Agenda do Barbeiro" - Rota para Cancelar)
     */
    async cancelar(agendamentoId, userId, barbeariaIdUsuario, tipoUsuario) { 
        
        const agendamento = await prisma.agendamento.findUnique({
            where: { id: agendamentoId },
        });

        if (!agendamento) {
            throw new Error('Agendamento não encontrado.');
        }
        
        // 1. Lógica de Autorização (Cliente ou Admin/Barbeiro da Barbeira correta)
        const isClient = agendamento.clienteId === userId;
        const isAdminOrBarbeiro = tipoUsuario !== 'cliente' && agendamento.barbeariaId === barbeariaIdUsuario;

        if (!isClient && !isAdminOrBarbeiro) {
            throw new Error('Usuário não autorizado a cancelar este agendamento.');
        }

        // 2. Executar Cancelamento
        const agendamentoCancelado = await prisma.agendamento.update({
            where: { id: agendamentoId },
            data: {
                status: 'cancelado' 
            }
        });

        return agendamentoCancelado;
    }
}

export default new AgendamentoService();