import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PEvent } from '../interfaces';
import eventService from '../services/eventService';

const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, PEvent>({
    mutationFn: (editedEvent: PEvent) => {
      if (editedEvent.id === undefined)
        throw new Error('Event id is undefined');

      return eventService.delete(editedEvent.id);
    },

    onSuccess() {
      queryClient.invalidateQueries(['events']);
    },

    onError() {
      queryClient.invalidateQueries(['events']);
    },
  });
};

export default useDeleteEvent;
