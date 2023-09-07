import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EventQuery } from '../entities';
import { PEvent } from '../entities/Event';
import eventService from '../services/eventService';

const useDeleteEvent = (query: EventQuery) => {
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
  });
};

export default useDeleteEvent;
