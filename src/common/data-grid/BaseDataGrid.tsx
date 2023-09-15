import { Alert } from '@mui/material';
import {
  DataGrid as DataGridX,
  GridCallbackDetails,
  GridPaginationModel,
  GridRowParams,
  GridRowSelectionModel,
  MuiEvent,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import useDelete from '../../hooks/useDelete';
import useDeleteAll from '../../hooks/useDeleteAll';
import useEdit from '../../hooks/useEdit';
import {
  ActionMap,
  Event,
  EventQuery,
  NotificationType,
  NotificationTypeQuery,
  Properties,
  Service,
} from '../../interfaces';
import EditDialog, { EditDialogProps } from '../edit/EditDialog';
import { CustomToolbar, getColumns } from './funcs';

export interface BaseDataGridProps {
  type: 'Event' | 'Notification';
  service: Service;
  query: EventQuery | NotificationTypeQuery;
  isLoading: boolean;
  totalRowCount: number;
  rows: Event[] | NotificationType[];
  action?: ActionMap;

  onPageChange: (pageNumber: number) => void;
  onRowClick: (
    params: GridRowParams,
    event: MuiEvent,
    details: GridCallbackDetails
  ) => void;
}

function BaseDataGrid({
  type,
  service,
  query,
  isLoading,
  totalRowCount,
  rows,

  onPageChange,
  onRowClick,
}: BaseDataGridProps) {
  const [dialogProps, setDialogProps] = useState<EditDialogProps>({
    open: false,
    type,
    data: null,
    operation: 'Edit',
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [selectedRows, setSelectedRows] = useState<
    Event[] | NotificationType[]
  >([]);

  const isMobile = useCheckMobileScreen();
  const apiRef = useGridApiRef();

  const editHook = useEdit(service, query);
  const delHook = useDelete(service);
  const delAllHook = useDeleteAll(service);

  useEffect(() => {
    apiRef.current.setColumnVisibility('description', !isMobile);
  }, [isMobile, apiRef]);

  if (delHook.error) {
    return (
      <Alert severity='error'>An error occurred while deleting the event</Alert>
    );
  }

  if (delAllHook.error) {
    return (
      <Alert severity='error'>
        An error occurred while deleting the events
      </Alert>
    );
  }

  const handlePageChange = (model: GridPaginationModel) => {
    onPageChange(model.page + 1); // updates the page state in the parent component
    setPaginationModel(model);
  };

  const handleClose = () => {
    setDialogProps({ ...dialogProps, open: false, data: null });
  };

  const handleClickEdit = (data: Properties) => {
    setDialogProps({ ...dialogProps, open: true, data });
  };

  const handleRowSelectionModelChange = (ids: GridRowSelectionModel) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    setSelectedRows(selectedRowsData as Event[] | NotificationType[]);
  };

  const handleClickDeleteMultiple = () => {
    delAllHook.mutate(selectedRows.map((row) => row.id));

    setSelectedRows([]);
  };

  const columns = getColumns(type, editHook, delHook, handleClickEdit);

  return (
    <>
      <div style={{ height: selectedRows.length > 0 ? '400px' : '380px' }}>
        <EditDialog
          {...dialogProps}
          onClose={handleClose}
          editHook={editHook}
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
          onRowClick={onRowClick}
          pageSizeOptions={[5]}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            // remove the focus outline
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
              outline: 'none !important',
            },
          }}
          slots={{
            toolbar:
              selectedRows.length > 0
                ? () => CustomToolbar(handleClickDeleteMultiple)
                : null,
          }}
        />
      </div>
    </>
  );
}

export default BaseDataGrid;
