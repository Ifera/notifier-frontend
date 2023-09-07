import { MouseEvent, useState } from 'react';
import DataGrid from '../../common/data-grid';
import {
  ActionMap,
  EventRow,
  NotificationRow,
} from '../../common/data-grid/entities';
import useEvents from '../../hooks/useEvents';
import { Alert } from '@mui/material';

interface EventProps {
  application: string | number;
}

function Event({ application }: EventProps) {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, error } = useEvents({
    application,
    pageNumber, // TODO: implement remaining query params
  });

  if (error) {
    return (
      <Alert severity='error'>An error occurred while loading the events</Alert>
    );
  }

  const onPageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const onClickEdit = (e: MouseEvent, row: EventRow | NotificationRow) => {};

  const onClickDelete = (e: MouseEvent, row: EventRow | NotificationRow) => {};

  const onClickSwitch = (e: MouseEvent, row: EventRow | NotificationRow) => {
    const t = e.target as HTMLInputElement;
    const r = row as EventRow;

    console.log(r, t.checked);
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
