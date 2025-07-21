import axios from 'axios';
import { useState } from 'react';

export interface UsuarioCadastro {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    aboutMe?: string;
}

interface UsuarioResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    aboutMe?: string;
    phoneNumber: string;
}

interface UseCadastrarUsuarioReturn {
  mutateAsync: (usuario: UsuarioCadastro) => Promise<UsuarioResponse>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
}

const useCadastrarUsuario = (): UseCadastrarUsuarioReturn => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = async (usuario: UsuarioCadastro): Promise<UsuarioResponse> => {
    setIsPending(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/user', usuario, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setIsSuccess(true);
      return response.data;
    } catch (err) {
      setIsError(true);
      const errorObj = err instanceof Error ? err : new Error('Erro desconhecido');
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

export default useCadastrarUsuario;
