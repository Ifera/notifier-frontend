import { Alert } from '@mui/material';
import {
  DataGrid as DataGridX,
  GridPaginationModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import useDelete from '../../hooks/useDelete';
import useEdit from '../../hooks/useEdit';
import {
  ActionMap,
  Event,
  EventQuery,
  NotificationType,
  NotificationTypeQuery,
} from '../../interfaces';
import APIClient from '../../services/apiClient';
import EditDialog, { EditDialogProps } from '../edit/EditDialog';
import { getColumns } from './funcs';

interface DataGridProps {
  type: 'Event' | 'Notification';
  service: APIClient<Event | NotificationType>;
  query: EventQuery | NotificationTypeQuery;
  isLoading: boolean;
  totalRowCount: number;
  rows: Event[] | NotificationType[];
  action?: ActionMap;

  onPageChange: (pageNumber: number) => void;
}

function DataGrid({
  type,
  service,
  query,
  isLoading,
  totalRowCount,
  rows,
  action,

  onPageChange,
}: DataGridProps) {
  const [dialogProps, setDialogProps] = useState<EditDialogProps>({
    open: false,
    type,
    data: null,
    onClose: () => {},
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const isMobile = useCheckMobileScreen();
  const apiRef = useGridApiRef();

  const editHook = useEdit(service, query);
  const delHook = useDelete(service);

  useEffect(() => {
    apiRef.current.setColumnVisibility('description', !isMobile);
  }, [isMobile, apiRef]);

  if (editHook.error) {
    return (
      <Alert severity='error'>An error occurred while updating the event</Alert>
    );
  }

  if (delHook.error) {
    return (
      <Alert severity='error'>An error occurred while deleting the event</Alert>
    );
  }

  const handlePageChange = (model: GridPaginationModel) => {
    onPageChange(model.page + 1); // updates the page state in the parent component
    setPaginationModel(model);
  };

  const handleClose = () => {
    setDialogProps({ ...dialogProps, open: false, data: null });
  };

  const handleClickEdit = (data: Event | NotificationType) => {
    setDialogProps({ ...dialogProps, open: true, data });
  };

  const columns = getColumns(type, editHook, delHook, handleClickEdit, action);

  return (
    <>
      <div style={{ height: '380px' }}>
        <EditDialog {...dialogProps} onClose={handleClose} />

        <DataGridX
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          rowCount={totalRowCount}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel,
            },
            columns: {
              columnVisibilityModel: {
                [type.toLowerCase()]: true,
                description: true,
                action: true,
              },
            },
          }}
          paginationMode='server'
          paginationModel={paginationModel}
          onPaginationModelChange={handlePageChange}
          pageSizeOptions={[5]}
          checkboxSelection
          sx={{
            // remove the focus outline
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
              outline: 'none !important',
            },
          }}
        />
      </div>
    </>
  );
}

export default DataGrid;
