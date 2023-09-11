import { Alert } from '@mui/material';
import {
  DataGrid as DataGridX,
  GridPaginationModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
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
import { ValueProps } from '../PreviewForm';
import EditDialog, { EditDialogProps, EditResponse } from '../edit/EditDialog';
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
  });

  const [editResponse, setEditResponse] = useState<EditResponse>({
    success: false,
    error: null,
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
    setEditResponse({ success: false, error: null });
  };

  const handleClickEdit = (data: Event | NotificationType) => {
    setDialogProps({ ...dialogProps, open: true, data });
  };

  const handleEditDialogSubmit = (
    data: Event | NotificationType,
    values: ValueProps
  ) => {
    editHook.mutate({
      id: data.id,
      name: values.name,
      description: values.description,
    });

    if (editHook.isSuccess) {
      setEditResponse({ success: true, error: null });
      return;
    }

    if (editHook.isError) {
      const err = editHook.error as AxiosError;

      setEditResponse({
        success: false,
        error: (err.response?.data as string) || 'An error occurred',
      });

      return;
    }
  };

  const columns = getColumns(type, editHook, delHook, handleClickEdit, action);

  return (
    <>
      <div style={{ height: '380px' }}>
        <EditDialog
          {...dialogProps}
          onClose={handleClose}
          onSubmit={handleEditDialogSubmit}
          response={editResponse}
        />

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
