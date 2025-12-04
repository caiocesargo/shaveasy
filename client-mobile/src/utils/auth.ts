import { storage } from './storage';

export interface User {
  id: string;
  nome: string;
  email: string;
  tipo: 'cliente' | 'barbeiro';
  especialidade?: string;
  barbeariaId?: string;
  barbearia?: {
    id: string;
    nome: string;
  };
}

export const authUtils = {
  /**
   * Verifica se existe um token válido e retorna os dados do usuário
   */
  async getAuthenticatedUser(): Promise<{ token: string; user: User } | null> {
    try {
      const token = await storage.getItem('token');
      const userString = await storage.getItem('user');
      
      if (!token || !userString) {
        return null;
      }

      const user: User = JSON.parse(userString);
      
      // Validação básica dos dados do usuário
      if (!user.id || !user.tipo || !['cliente', 'barbeiro'].includes(user.tipo)) {
        return null;
      }

      return { token, user };
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log("Erro ao verificar autenticação:", error);
      return null;
    }
  },

  /**
   * Remove os dados de autenticação do storage
   */
  async logout(): Promise<void> {
    try {
      await storage.removeItem('token');
      await storage.removeItem('user');
      router.replace('/'); // Redireciona para a tela inicial após logout
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log("Erro ao fazer logout:", error);
    }
  },

  /**
   * Retorna a rota apropriada baseada no tipo do usuário
   */
  getHomeRouteForUserType(userType: 'cliente' | 'barbeiro'): string {
    return userType === 'barbeiro' ? '/homepagebarber' : '/homepage';
  }
};
