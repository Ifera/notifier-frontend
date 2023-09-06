import { useQuery } from '@tanstack/react-query';
import APIClient, { FetchResponse } from '../services/api-client';
import { QueryParams } from '../entities';
import { Event } from '../entities/Event';
import ms from 'ms';

const apiClient = new APIClient<Event>('events');

const useEvents = (params: QueryParams) => {
  const pageNumber = params.pageNumber || 1;

  return useQuery<FetchResponse<Event>, Error>({
    queryKey: ['application', params.application, 'events', pageNumber],
    queryFn: () =>
      apiClient.getAll({
        params: {
          ...params,
          pageNumber,
          pageSize: params.pageSize || 5,
        },
      }),
    keepPreviousData: true,
    staleTime: ms('10s'),
  });
};

export default useEvents;
