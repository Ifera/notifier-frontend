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

  return useMutation<AuthResponse, Error, User>({
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
};

export default useAuth;
