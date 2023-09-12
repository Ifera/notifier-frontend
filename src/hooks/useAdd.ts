import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FetchResponse, PProperties, Properties, Query } from '../interfaces';
import APIClient from '../services/apiClient';

const useAdd = (service: APIClient<Properties>, query: Query) => {
  const queryClient = useQueryClient();
  const queryKey = [...service.queryKey, query];

  return useMutation<Properties, Error, PProperties>({
    mutationFn: (obj: PProperties) => {
      return service.post(obj);
    },

    onSuccess(saved: Properties, edited: PProperties) {
      queryClient.setQueryData<FetchResponse<Properties>>(queryKey, (res) => {
        if (!res) return;

        const results = res.results || [];

        return {
          ...res,
          results: [
            ...results.map((event) => (event.id === edited.id ? saved : event)),
          ],
        };
      });
    },

    onError() {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useAdd;
