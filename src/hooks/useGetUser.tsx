import axios from 'axios';
import { useState } from 'react';

interface UserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  aboutMe?: string;
  phoneNumber: string;
}

interface UseGetUserReturn {
  getUserById: (id: number) => Promise<UserData>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
}

const useGetUser = (): UseGetUserReturn => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getUserById = async (id: number): Promise<UserData> => {
    setIsPending(true);
    setIsError(false);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8080/user/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;
    } catch (err) {
      setIsError(true);
      const errorObj = err instanceof Error ? err : new Error('Erro ao buscar dados do usuário');
      setError(errorObj);
      throw errorObj;
    } finally {
      setIsPending(false);
    }
  };

  return {
    getUserById,
    isPending,
    isError,
    error,
  };
};

export default useGetUser;
