import { Alert } from '@mui/material';
import { useState } from 'react';
import DataGrid from '../../common/data-grid';
import useDelete from '../../hooks/useDelete';
import useEdit from '../../hooks/useEdit';
import useEvents from '../../hooks/useEvents';
import { ActionMap, EventQuery } from '../../interfaces';
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

  const { data, isLoading, error } = useEvents(query);

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

  const onClickEdit = (id: number | string) => {};

  const onClickDelete = (id: number | string) => {
    delEvent.mutate({ id });
  };

  const onClickSwitch = (id: number | string, value: boolean) => {
    editEvent.mutate({
      id,
      is_active: value,
    });
  };

  const action: ActionMap = {
    onClickEdit,
    onClickDelete,
    onClickSwitch,
  };

  return (
    <DataGrid
      type='Event'
      action={action}
      isLoading={isLoading}
      totalRowCount={data?.total_count || 0}
      rows={data?.results || []}
      onPageChange={onPageChange}
    />
  );
}

export default Event;
