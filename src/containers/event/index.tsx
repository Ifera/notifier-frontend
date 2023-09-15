import { Alert, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import ToolBar from '../../common/toolbar';
import Event from '../../components/event';
import { GRID_PAGE_SIZE } from '../../constants';
import useGetAll from '../../hooks/useGetAll';
import { EventQuery, ID, NullableID, Query } from '../../interfaces';
import eventService from '../../services/eventService';

interface EventContainerProps {
  selectedApp: ID;
  selectedAppName: string;
  selectedEvent: NullableID;
  onEventSelect: (id: ID, name: string) => void;
}

function EventContainer({
  selectedApp,
  selectedAppName,
  selectedEvent,
  onEventSelect,
}: EventContainerProps) {
  const [query, setQuery] = useState<Query>({
    pageNumber: 1,
    pageSize: GRID_PAGE_SIZE,
    application: selectedApp,
  });

  const { data, isLoading } = useGetAll(eventService, query);
  const totalCount = data?.total_count || 0;

  useEffect(() => {
    setQuery((prev) => ({ ...prev, application: selectedApp }));
  }, [selectedApp]);

  return (
    <>
      <ToolBar
        type='Event'
        query={query}
        setQuery={setQuery}
        service={eventService}
        parentId={selectedApp}
        parentName={selectedAppName}
        totalCount={totalCount}
      />

      <Box mt={4}>
        {!isLoading && totalCount === 0 ? (
          <Alert severity='warning'>
            No events found. Please add a new event by clicking on the (+)
            button above.
          </Alert>
        ) : (
          <Event query={query as EventQuery} onEventSelect={onEventSelect} />
        )}
      </Box>

      {!selectedEvent && totalCount !== 0 && (
        <Alert severity='info' sx={{ mt: 4 }}>
          Please select an event to display the notification types.
        </Alert>
      )}
    </>
  );
}

export default EventContainer;
