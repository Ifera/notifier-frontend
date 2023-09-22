import { Alert, Box } from '@mui/material';
import { useEffect } from 'react';
import { useBetween } from 'use-between';
import GlobalState from '../../GlobalState';
import ToolBar from '../../common/toolbar';
import Event from '../../components/event';
import useGetAll from '../../hooks/useGetAll';
import { EventQuery, ID, NullableID } from '../../interfaces';
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
  const { eventQuery, setEventQuery: setQuery } = useBetween(GlobalState);
  const query = eventQuery as EventQuery;

  useEffect(() => {
    if (query.application === selectedApp) return;

    setQuery((prev) => ({ ...prev, application: selectedApp, pageNumber: 1 }));
  }, [selectedApp]);

  if (!query.application) {
    query.application = selectedApp;
  }

  const { data, isLoading } = useGetAll(eventService, query);
  const totalCount = data?.total_count || 0;

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
        {totalCount === 0 && !isLoading ? (
          <Alert severity='warning'>
            {query.like || query.isActive !== undefined
              ? 'No events found for the selected filters.'
              : 'No events found. Please add a new event by clicking on the (+) button above.'}
          </Alert>
        ) : (
          <Event query={query as EventQuery} setQuery={setQuery} onEventSelect={onEventSelect} />
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
