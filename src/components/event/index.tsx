import { Alert } from '@mui/material';
import { useState } from 'react';
import DataGrid from '../../common/data-grid';
import useGetAll from '../../hooks/useGetAll';
import { EventQuery, Event as IEvent } from '../../interfaces';
import eventService from '../../services/eventService';

interface EventProps {
  application: string | number;
}

function Event({ application }: EventProps) {
  const [pageNumber, setPageNumber] = useState(1);

  const query: EventQuery = {
    application,
    pageNumber,
  };

  const { data, isLoading, error } = useGetAll(eventService, query);

  if (error) {
    return (
      <Alert severity='error'>An error occurred while loading the events</Alert>
    );
  }

  const onPageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  return (
    <DataGrid
      type='Event'
      service={eventService}
      query={query}
      isLoading={isLoading}
      totalRowCount={data?.total_count || 0}
      rows={(data?.results as IEvent[]) || []}
      onPageChange={onPageChange}
    />
  );
}

export default Event;
