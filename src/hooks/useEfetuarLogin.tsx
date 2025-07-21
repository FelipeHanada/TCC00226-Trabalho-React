import axios from 'axios';
import { useState } from 'react';
import type { Usuario } from "../interfaces/Usuario";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    aboutMe: string;
    phoneNumber: string;
  };
}

interface ApiLoginResponse {
  token: string;
  user?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    aboutMe?: string;
    phoneNumber?: string;
  };
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  aboutMe?: string;
  phoneNumber?: string;
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

      const response = await axios.post<ApiLoginResponse>('http://localhost:8080/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.data.token) {
        setIsSuccess(true);
        
        const userData = response.data.user ? {
          id: response.data.user.id,
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          aboutMe: response.data.user.aboutMe || '',
          phoneNumber: response.data.user.phoneNumber || ''
        } : {
          id: response.data.id!,
          email: response.data.email!,
          firstName: response.data.firstName!,
          lastName: response.data.lastName!,
          aboutMe: response.data.aboutMe || '',
          phoneNumber: response.data.phoneNumber || ''
        };
        
        return {
          token: response.data.token,
          user: userData
        };
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (err) {
      setIsError(true);
      
      let errorMessage = 'Não foi possível fazer login';
      
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        if (status === 404) {
          errorMessage = 'Não foi possível fazer login. Verifique suas credenciais.';
        } else if (status === 401) {
          errorMessage = 'E-mail ou senha incorretos.';
        } else if (status >= 500) {
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      const errorObj = new Error(errorMessage);
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
