import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { Event, EventQuery, FetchResponse } from '../interfaces';
import eventService from '../services/eventService';

const useEvents = (query: EventQuery) => {
  query.pageNumber = query.pageNumber || 1;
  query.pageSize = query.pageSize || 5;

  return useQuery<FetchResponse<Event>, Error>({
    queryKey: ['events', query],
    queryFn: () =>
      eventService.getAll({
        params: {
          ...query,
        },
      }),
    keepPreviousData: true,
    staleTime: ms('5s'),
  });
};

export default useEvents;
