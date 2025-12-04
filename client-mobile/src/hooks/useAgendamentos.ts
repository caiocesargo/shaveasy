import { useQuery } from '@tanstack/react-query';
import { criarAgendamento, listarMeusAgendamentos, cancelarAgendamento, listarAgendamentosBarber } from "../services/agendamento"

const useAgendamentos = (token: string | null) => {
    const agendarServico = async (
        servicoId: string,
        barbeiroId: number,
        dataHora: string,
        authToken: string
    ) => {
        const agendamento = await criarAgendamento({ servicoId, barbeiroId, dataHora }, authToken);
        return agendamento;
    };

    const buscarMeusAgendamentos = async (authToken: string) => {
        const agendamentos = await listarMeusAgendamentos(authToken);
        return agendamentos;
    };

    const cancelar = async (agendamentoId: string, authToken: string) => {
        const resultado = await cancelarAgendamento(agendamentoId, authToken);
        return resultado;
    };

    const agendamentos = useQuery({
        queryKey: ['agendamentos-barber'],
        queryFn: () => listarAgendamentosBarber(token || ''),
        enabled: !!token,
        staleTime: 1000 * 60 * 5,
    });

    return { agendarServico, buscarMeusAgendamentos, cancelar, agendamentos };
};

export default useAgendamentos;