import { Alert } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import useGetAll from '../../hooks/useGetAll';
import {
  Event,
  EventQuery,
  ID,
  NotificationType,
  NotificationTypeQuery,
  Properties,
  Query,
} from '../../interfaces';
import BaseDataGrid, { BaseDataGridProps } from './BaseDataGrid';

interface DataGridProps extends Pick<BaseDataGridProps, 'type' | 'service'> {
  query: Query;
  setQuery: Dispatch<SetStateAction<Query>>;
  onSelect: (id: ID, name: string) => void;
}

function DataGrid({
  type,
  service,
  query,

  setQuery,
  onSelect,
}: DataGridProps) {
  const { data, isLoading, error } = useGetAll(service, query);

  if (error) {
    return (
      <Alert severity='error'>An error occurred while loading the {type.toLowerCase()}s</Alert>
    );
  }

  const onPageChange = (pageNumber: number) => {
    setQuery((prev) => ({ ...prev, pageNumber }));
  };

  const handleRowClick = (data: Properties) => {
    let d = null;

    if (type === 'Event') {
      d = data as Event;
    }

    if (type === 'Notification') {
      d = data as NotificationType;
    }

    if (!d) return; // not possible

    onSelect(d.id, d.name);
  };

  return (
    <BaseDataGrid
      type={type}
      service={service}
      query={query as EventQuery | NotificationTypeQuery}
      isLoading={isLoading}
      totalRowCount={data?.total_count || 0}
      rows={(data?.results as Event[] | NotificationType[]) || []}
      onPageChange={onPageChange}
      onRowClick={handleRowClick}
    />
  );
}

export default DataGrid;
