import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { ID, Properties } from '../interfaces';
import APIClient from '../services/apiClient';

const useGet = (service: APIClient<ID, Properties>, id: ID) => {
  return useQuery<Properties, Error>({
    queryKey: [...service.queryKey, id],
    queryFn: () => service.get(id),
    staleTime: ms('1s'),
  });
};

export default useGet;
