import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import { EventQuery } from '../entities';
import { Event, PEvent } from '../entities/Event';
import { FetchResponse } from '../services/apiClient';
import eventService from '../services/eventService';

const useEditEvent = (query: EventQuery) => {
  const queryClient = useQueryClient();
  const queryKey = ['events', query];

  return useMutation<Event, Error, PEvent>({
    mutationFn: (editedEvent: PEvent) => {
      if (editedEvent.id === undefined)
        throw new Error('Event id is undefined');

      return eventService.patch(editedEvent.id, _.omit(editedEvent, 'id'));
    },

    onSuccess(savedEvent: Event, editedEvent: PEvent) {
      queryClient.setQueryData<FetchResponse<Event>>(queryKey, (res) => {
        if (!res) return;

        const events = res.results || [];

        return {
          ...res,
          results: [
            ...events.map((event) =>
              event.id === editedEvent.id ? savedEvent : event
            ),
          ],
        };
      });
    },

    onError() {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useEditEvent;
