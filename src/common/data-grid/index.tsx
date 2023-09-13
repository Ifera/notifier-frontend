import { Alert } from '@mui/material';
import { GridRowParams } from '@mui/x-data-grid';
import { useState } from 'react';
import useGetAll from '../../hooks/useGetAll';
import {
  Event,
  EventQuery,
  ID,
  NotificationType,
  NotificationTypeQuery,
  Query,
} from '../../interfaces';
import BaseDataGrid, { BaseDataGridProps } from './BaseDataGrid';

interface DataGridProps extends Pick<BaseDataGridProps, 'type' | 'service'> {
  query: Query;
  onSelect: (id: ID) => void;
}

function DataGrid({
  type,
  service,
  query,

  onSelect,
}: DataGridProps) {
  const [pageNumber, setPageNumber] = useState(1);
  query.pageNumber = pageNumber; // do not change order

  const { data, isLoading, error } = useGetAll(service, query);

  if (error) {
    return (
      <Alert severity='error'>
        An error occurred while loading the {type.toLowerCase()}s
      </Alert>
    );
  }

  const onPageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleRowClick = (params: GridRowParams) => {
    let data = null;

    if (type === 'Event') {
      data = params.row as Event;
    }

    if (type === 'Notification') {
      data = params.row as NotificationType;
    }

    if (!data) return; // not possible

    onSelect(data.id);
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
