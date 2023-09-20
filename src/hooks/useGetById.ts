import { useQuery } from '@tanstack/react-query';
import { ID, Properties } from '../interfaces';
import APIClient from '../services/apiClient';

const useGetById = (service: APIClient<ID, Properties>, id: ID) => {
  return useQuery<Properties, Error>({
    queryKey: [...service.queryKey, id],
    queryFn: () => service.getById(id),
  });
};

export default useGetById;
