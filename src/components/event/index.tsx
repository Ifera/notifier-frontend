import { Dispatch, SetStateAction } from 'react';
import DataGrid from '../../common/data-grid';
import { EventQuery, ID, Query } from '../../interfaces';
import eventService from '../../services/eventService';

interface EventProps {
  query: EventQuery;
  setQuery: Dispatch<SetStateAction<Query>>;
  onEventSelect: (id: ID, name: string) => void;
}

function Event({ query, setQuery, onEventSelect }: EventProps) {
  return (
    <DataGrid
      type='Event'
      service={eventService}
      query={query}
      setQuery={setQuery}
      onSelect={onEventSelect}
    />
  );
}

export default Event;
