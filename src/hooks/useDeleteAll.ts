import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ID, Properties } from '../interfaces';
import APIClient from '../services/apiClient';

const useDeleteAll = (service: APIClient<Properties>) => {
  const queryClient = useQueryClient();
  const queryKey = [...service.queryKey];

  return useMutation<string, Error, ID[]>({
    mutationFn: (ids) => {
      return service.deleteAll(ids);
    },

    onSuccess() {
      queryClient.invalidateQueries(queryKey);
    },

    onError() {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useDeleteAll;
