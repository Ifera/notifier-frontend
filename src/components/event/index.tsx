import DataGrid from '../../common/data-grid';
import { EventQuery, ID } from '../../interfaces';
import eventService from '../../services/eventService';

interface EventProps {
  query: EventQuery;
  onEventSelect: (id: ID, name: string) => void;
}

function Event({ query, onEventSelect }: EventProps) {
  return (
    <DataGrid
      type='Event'
      service={eventService}
      query={query}
      onSelect={onEventSelect}
    />
  );
}

export default Event;
