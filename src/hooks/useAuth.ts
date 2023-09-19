import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '../interfaces';
import APIClient from '../services/apiClient';

export interface AuthResponse {
  token: string;
  user: User;
}

const useAuth = (service: APIClient<User, AuthResponse>) => {
  const queryClient = useQueryClient();
  const queryKey = [...service.queryKey];

  function isAuthenticated() {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decodedToken.exp * 1000;
    console.log('expirationTime', expirationTime);
    console.log('Date.now()', Date.now());
    console.log('isExpired', Date.now() - expirationTime);
    const isExpired = Date.now() - expirationTime > 0;

    if (isExpired) {
      localStorage.removeItem('token');
      return false;
    }

    return token !== null;
  }

  const mutation = useMutation<AuthResponse, Error, User>({
    mutationFn: (obj: User) => {
      return service.post(obj);
    },

    onSuccess() {
      queryClient.invalidateQueries(queryKey);
    },

    onError() {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return {
    isAuthenticated,
    mutation,
  };
};

export default useAuth;
