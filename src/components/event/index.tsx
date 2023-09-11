import DataGrid from '../../common/data-grid';
import { ID } from '../../interfaces';
import eventService from '../../services/eventService';

interface EventProps {
  application: ID;
  onEventSelect: (id: ID) => void;
}

function Event({ application, onEventSelect }: EventProps) {
  return (
    <DataGrid
      id={application}
      type='Event'
      service={eventService}
      onSelect={onEventSelect}
    />
  );
}

export default Event;
