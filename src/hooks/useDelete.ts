import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PProperties, Properties } from '../interfaces';
import APIClient from '../services/apiClient';

function useDelete(service: APIClient<Properties>) {
  const queryClient = useQueryClient();
  const queryKey = [...service.queryKey];

  return useMutation<string, Error, PProperties>({
    mutationFn: (obj: PProperties) => {
      if (obj.id === undefined)
        throw new Error('The required property "id" is missing.');

      return service.delete(obj.id);
    },

    onSuccess() {
      queryClient.invalidateQueries(queryKey);
    },

    onError() {
      queryClient.invalidateQueries(queryKey);
    },
  });
}

export default useDelete;
