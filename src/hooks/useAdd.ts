import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PProperties, Properties } from '../interfaces';
import APIClient from '../services/apiClient';

const useAdd = (service: APIClient<PProperties, Properties>) => {
  const queryClient = useQueryClient();
  const queryKey = [...service.queryKey];

  return useMutation<Properties, Error, PProperties>({
    mutationFn: (obj: PProperties) => {
      return service.post({ ...obj, is_active: true });
    },

    onSuccess() {
      queryClient.invalidateQueries(queryKey);
    },

    onError() {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useAdd;
