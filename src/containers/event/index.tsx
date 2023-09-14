import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import ToolBar from '../../common/toolbar';
import Event from '../../components/event';
import { GRID_PAGE_SIZE } from '../../constants';
import { EventQuery, ID, Query } from '../../interfaces';
import eventService from '../../services/eventService';

interface EventContainerProps {
  selectedApp: ID;
  onEventSelect: (id: ID) => void;
}

function EventContainer({ selectedApp, onEventSelect }: EventContainerProps) {
  const [query, setQuery] = useState<Query>({
    pageNumber: 1,
    pageSize: GRID_PAGE_SIZE,
    application: selectedApp,
  });

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
      />
      <Box mt={4}>
        <Event query={query as EventQuery} onEventSelect={onEventSelect} />
      </Box>
    </>
  );
}

export default EventContainer;
