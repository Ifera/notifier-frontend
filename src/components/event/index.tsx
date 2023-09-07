import { Alert } from '@mui/material';
import { useState } from 'react';
import DataGrid from '../../common/data-grid';
import { ActionMap, EventRow } from '../../common/data-grid/entities';
import { EventQuery } from '../../entities';
import useDeleteEvent from '../../hooks/useDeleteEvent';
import useEditEvent from '../../hooks/useEditEvent';
import useEvents from '../../hooks/useEvents';

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

  const editEvent = useEditEvent(query);
  const delEvent = useDeleteEvent(query);

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

  const rows: EventRow[] = !data
    ? []
    : data.results.map((event) => {
        const row = {
          id: event.id,
          event: event.name,
          description: event.description,
          is_active: event.is_active,
        };

        return row;
      });

  return (
    <DataGrid
      type='Event'
      action={action}
      isLoading={isLoading}
      totalRowCount={data?.total_count || 0}
      rows={rows}
      onPageChange={onPageChange}
    />
  );
}

export default Event;
