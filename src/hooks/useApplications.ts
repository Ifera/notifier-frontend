import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { Application, ApplicationQuery, FetchResponse } from '../interfaces';
import applicationService from '../services/applicationService';

const useApplications = (query: ApplicationQuery) => {
  query.pageNumber = query.pageNumber || 1;
  query.pageSize = query.pageSize || 3;

  return useQuery<FetchResponse<Application>, Error>({
    queryKey: ['apps', query],
    queryFn: () =>
      applicationService.getAll({
        params: {
          ...query,
        },
      }),
    keepPreviousData: true,
    staleTime: ms('10s'),
  });
};

export default useApplications;
