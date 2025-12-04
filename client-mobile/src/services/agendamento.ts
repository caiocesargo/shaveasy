import { AxiosError } from 'axios';
import api from './api';

export interface CriarAgendamentoData {
  servicoId: string;
  barbeiroId: number;
  dataHora: string;
}

export interface Agendamento {
  id: string;
  dataHora: string;
  dataHoraFim: string;
  status: string;
  cliente: {
    nome: string;
    telefone: string;
  };
  barbeiro: {
    nome: string;
  };
  servico: {
    nome: string;
  };
}

export const criarAgendamento = async (data: CriarAgendamentoData, token: string) => {
  try {
    const response = await api.post('/agendamento/criar', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || 'Erro ao criar agendamento');
    }
    throw new Error('Erro desconhecido ao criar agendamento');
  }
};

export const listarAgendamentosBarber = async (token: string) => {
  try {
    const response = await api.get('/agendamento/agenda', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || 'Erro ao listar agendamentos');
    }
    throw new Error('Erro desconhecido ao listar agendamentos');
  }
};

export const listarMeusAgendamentos = async (token: string) => {
  try {
    const response = await api.get('/agendamento/meus-agendamentos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || 'Erro ao listar agendamentos');
    }
    throw new Error('Erro desconhecido ao listar agendamentos');
  }
};

export const cancelarAgendamento = async (agendamentoId: string, token: string) => {
  try {
    const response = await api.put(`/agendamento/cancelar/${agendamentoId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || 'Erro ao cancelar agendamento');
    }
    throw new Error('Erro desconhecido ao cancelar agendamento');
  }
};