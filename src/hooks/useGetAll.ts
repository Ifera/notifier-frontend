import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { FetchResponse, Properties, Query } from '../interfaces';
import APIClient from '../services/apiClient';

const useGetAll = (service: APIClient<Properties>, query: Query) => {
  query.pageNumber = query.pageNumber || 1;
  query.pageSize = query.pageSize || 5;

  return useQuery<FetchResponse<Properties>, Error>({
    queryKey: [...service.queryKey, query],
    queryFn: () =>
      service.getAll({
        params: {
          ...query,
        },
      }),
    keepPreviousData: true,
    staleTime: ms('5s'),
  });
};

export default useGetAll;
