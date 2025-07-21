import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';

interface CurrentUserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  aboutMe?: string;
  phoneNumber?: string;
}

interface UseCurrentUserReturn {
  user: CurrentUserData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export default function useCurrentUser(): UseCurrentUserReturn {
  const [user, setUser] = useState<CurrentUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, setUser: setAuthUser } = useAuthStore();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) {
        setError('Token não encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:8080/auth/user/${token}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const userData = response.data;
        setUser(userData);
        
        // Atualizar o store com as informações completas do usuário
        setAuthUser({
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          aboutMe: userData.aboutMe || '',
          phoneNumber: userData.phoneNumber || '',
        });

      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Erro ao buscar dados do usuário');
        } else {
          setError('Erro inesperado ao buscar dados do usuário');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [token, setAuthUser]);

  const refetch = async () => {
    if (token) {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`http://localhost:8080/auth/user/${token}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const userData = response.data;
        setUser(userData);
        setAuthUser({
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          aboutMe: userData.aboutMe || '',
          phoneNumber: userData.phoneNumber || '',
        });
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Erro ao buscar dados do usuário');
        } else {
          setError('Erro inesperado ao buscar dados do usuário');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    user,
    loading,
    error,
    refetch,
  };
}
