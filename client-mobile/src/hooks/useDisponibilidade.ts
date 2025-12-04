import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import api from "../services/api";

interface UseDisponibilidadeOptions {
  barbeiroId: number;
  selectedDate: string;
  token: string | null;
}

const useDisponibilidade = ({ barbeiroId, selectedDate, token }: UseDisponibilidadeOptions) => {
  const query = useQuery({
    queryKey: ["disponibilidade", barbeiroId, selectedDate],
    queryFn: async () => {
      if (!token) throw new Error("Token not available");

      const resp = await api.get(
        `/agendamento/disponibilidade?barbeiroId=${barbeiroId}&data=${selectedDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return resp.data;
    },
    enabled: !!token,
  });

  const horariosOcupados = useMemo(() => {
    if (!query.data) return [];
    
    return query.data.map((isoString: string) => {
      const date = new Date(isoString);
      return date.toISOString().substring(11, 16);
    });
  }, [query.data]);

  return {
    ...query,
    horariosOcupados,
  };
};

export default useDisponibilidade;
