import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

interface UseBarbeariaOptions {
  token: string | null;
}

const useBarbearia = ({ token }: UseBarbeariaOptions) =>
  useQuery({
    queryKey: ["barbearia"],
    queryFn: async () => {
      if (!token) throw new Error("Token not available");

      const resp = await api.get("/barbearias", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const barbearia = resp.data;

      return {
        barbearia,
      };
    },
    enabled: !!token,
  });

export default useBarbearia;
