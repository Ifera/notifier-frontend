import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import tagService from '../services/tagService';

const useTags = () => {
  return useQuery<string[], Error>({
    queryKey: [...tagService.queryKey],
    queryFn: () => tagService.get(),
    staleTime: ms('5s'),
  });
};

export default useTags;
