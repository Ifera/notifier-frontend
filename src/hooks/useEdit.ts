import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import { FetchResponse, PProperties, Properties, Query } from '../interfaces';
import APIClient from '../services/apiClient';

const useEdit = (service: APIClient<PProperties, Properties>, query: Query) => {
  const queryClient = useQueryClient();
  const queryKey = [...service.queryKey, query];

  return useMutation<Properties, Error, PProperties>({
    mutationFn: (obj: PProperties) => {
      if (obj.id === undefined)
        throw new Error('The required property "id" is missing.');

      return service.patch(obj.id, _.omit(obj, 'id'));
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

export default useEdit;
