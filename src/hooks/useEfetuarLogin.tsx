import axios from 'axios';
import { useState } from 'react';
import type { Usuario } from "../interfaces/Usuario";

interface LoginResponse {
  id: number;
}

interface UseEfetuarLoginReturn {
  mutateAsync: (usuario: Usuario) => Promise<LoginResponse>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
}

const useEfetuarLogin = (): UseEfetuarLoginReturn => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = async (usuario: Usuario): Promise<LoginResponse> => {
    setIsPending(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);

    try {
      const loginData = {
        email: usuario.email,
        password: usuario.senha
      };

      const response = await axios.post('http://localhost:8080/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      
      
      if (response.data.token && Number(response.data.token) > 0) {
        setIsSuccess(true);
        return { id: Number(response.data.token) };
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (err) {
      setIsError(true);
      const errorObj = err instanceof Error ? err : new Error('Erro de autenticação');
      setError(errorObj);
      throw errorObj;
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutateAsync,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useEfetuarLogin;
