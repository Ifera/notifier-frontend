import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient from '../services/apiClient';

const useTags = () => {
  return useQuery(
    ['tags'],
    () => {
      return new APIClient('tags').getTags();
    },
    {
      staleTime: ms('5s'),
    }
  );
};

export default useTags;
