import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import tagService from '../services/tagService';

const useTags = () => {
  return useQuery(
    ['tags'],
    () => {
      return tagService.getTags();
    },
    {
      staleTime: ms('5s'),
    }
  );
};

export default useTags;
