import { Alert } from '@mui/material';
import { useState } from 'react';
import DataGrid from '../../common/data-grid';
import useDelete from '../../hooks/useDelete';
import useEdit from '../../hooks/useEdit';
import useGetAll from '../../hooks/useGetAll';
import { ActionMap, EventQuery, Event as IEvent } from '../../interfaces';
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

  const editEvent = useEdit(eventService, query);
  const delEvent = useDelete(eventService);

  if (editEvent.error) {
    return (
      <Alert severity='error'>An error occurred while updating the event</Alert>
    );
  }

  if (delEvent.error) {
    return (
      <Alert severity='error'>An error occurred while deleting the event</Alert>
    );
  }

  const onPageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const onClickEdit = (id: number | string) => {
    console.log('edit', id);
  };

  const action: ActionMap = {
    onClickEdit,
  };

  return (
    <DataGrid
      type='Event'
      service={eventService}
      query={query}
      isLoading={isLoading}
      totalRowCount={data?.total_count || 0}
      rows={(data?.results as IEvent[]) || []}
      action={action}
      onPageChange={onPageChange}
    />
  );
}

export default Event;
