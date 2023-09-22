import { Alert, PaginationItem, Paper, TablePaginationProps, Tooltip } from '@mui/material';
import MuiPagination from '@mui/material/Pagination';
import {
  GridCellParams,
  GridPagination,
  GridPaginationModel,
  GridRowSelectionModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
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
import { dashboardState } from '../../pages/Dashboard';
import { snackbarState } from '../../utils/SnackbarState';
import Dialog, { DialogProps } from '../dialog';
import DeleteDialog from '../dialog/delete';
import { CustomToolbar, StyledDataGrid, getColumns } from './utils';

const LIMIT_SELECTION = 0;

export interface BaseDataGridProps {
  type: 'Event' | 'Notification';
  service: Service;
  query: EventQuery | NotificationTypeQuery;
  isLoading: boolean;
  totalRowCount: number;
  rows: Event[] | NotificationType[];
  action?: ActionMap;

  onPageChange: (pageNumber: number) => void;
  onRowClick: (data: Properties) => void;
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
  const [dialogProps, setDialogProps] = useState<DialogProps>({
    open: false,
    type,
  });

  const [dialogData, setDialogData] = useState<Properties | null>(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [selectedRows, setSelectedRows] = useState<Event[] | NotificationType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { selectedEvent, setSelectedEvent, setSelectedNotif } = useBetween(dashboardState);
  const { handleSuccessMessage, handleErrorMessage } = useBetween(snackbarState);

  const { isMobile, isTablet } = useCheckMobileScreen();
  const apiRef = useGridApiRef();

  const editHook = useEdit(service, query);
  const delHook = useDelete(service);
  const delAllHook = useDeleteAll(service);

  useEffect(() => {
    apiRef.current.setColumnVisibility('description', !isTablet);
  }, [isTablet, apiRef]);

  useEffect(() => {
    const page = query.pageNumber;

    if (!page) return;
    if (page === paginationModel.page + 1) return;

    setPaginationModel((prev) => ({ ...prev, page: page }));
  }, [query]);

  if (delHook.error) {
    return <Alert severity='error'>An error occurred while deleting the event</Alert>;
  }

  if (delAllHook.error) {
    return <Alert severity='error'>An error occurred while deleting the events</Alert>;
  }

  const handlePageChange = (model: GridPaginationModel) => {
    onPageChange(model.page + 1); // updates the page state in the parent component
    setPaginationModel(model);
  };

  const handleDialogClose = () => {
    setDialogData(null);
    setDialogProps({ ...dialogProps, open: false });
  };

  const handleClickEdit = (data: Properties) => {
    setDialogData(data);
    setDialogProps({ ...dialogProps, open: true });
  };

  const handleDialogSubmit = (success: boolean) => {
    if (!success) return;

    handleDialogClose();
  };

  const handleCellClick = (params: GridCellParams) => {
    if (params.field === 'action' || params.field === '__check__') return;
    if (selectedRows.length > LIMIT_SELECTION) return;

    onRowClick(params.row);
  };

  const handleRowSelectionModelChange = (ids: GridRowSelectionModel) => {
    const selection = ids.map((id) => rows.find((row) => row.id === id));
    setSelectedRows(selection as Event[] | NotificationType[]);

    if (selection.length > LIMIT_SELECTION) {
      if (type === 'Event') {
        setSelectedEvent(null);
        setSelectedNotif(null);
      }

      if (type === 'Notification') {
        setSelectedNotif(null);
      }
    }
  };

  const handleClickDeleteMultiple = () => {
    if (selectedRows.length === 0) return;

    // fix for the bug where the page number is not updated when the last row is deleted
    if (selectedRows.length === rows.length && paginationModel.page > 0) {
      setPaginationModel({
        ...paginationModel,
        page: paginationModel.page - 1,
      });
    }

    setIsDialogOpen(true);
  };

  const handleDeleteMultiple = () => {
    delAllHook.mutate(
      selectedRows.map((row) => row.id),
      {
        onSuccess: () => {
          handleSuccessMessage(`${type}s deleted successfully`);

          if (type !== 'Event') return;

          selectedRows.forEach((row) => {
            if (selectedEvent === row.id) {
              setSelectedEvent(null);
            }
          });
        },
        onError: (error) => {
          handleErrorMessage('Unable to delete the selected events');
          console.log(error);
        },
        onSettled: () => {
          setSelectedRows([]);
        },
      }
    );

    setIsDialogOpen(false);
  };

  const handleClickDelete = (data: Properties) => {
    // fix for the bug where the page number is not updated when the last row is deleted
    if (rows.length - 1 === 0 && paginationModel.page > 0) {
      setPaginationModel({
        ...paginationModel,
        page: paginationModel.page - 1,
      });
    }
  };

  const columns = getColumns({
    type,
    editHook,
    delHook,
    disableActionBtns: selectedRows.length > LIMIT_SELECTION,
    isMobile,
    isTablet,
    onClickEdit: handleClickEdit,
    onClickDelete: handleClickDelete,
  });

  const Pagination = ({
    page,
    className,
    onPageChange,
  }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) => {
    return (
      <MuiPagination
        color='primary'
        className={className}
        count={Math.ceil(totalRowCount / paginationModel.pageSize)}
        page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event as any, newPage - 1);
        }}
        renderItem={(item) => {
          if (item.type === 'previous' || item.type === 'next') {
            return (
              <Tooltip title={item.type === 'previous' ? 'Previous' : 'Next'}>
                <span>
                  {' '}
                  <PaginationItem {...item} />
                </span>
              </Tooltip>
            );
          }

          return <PaginationItem {...item} />;
        }}
      />
    );
  };

  const CustomPagination = (props: any) => {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  };

  return (
    <>
      <div style={{}}>
        {dialogData && (
          <Dialog
            {...dialogProps}
            operation={{
              type: 'Edit',
              editHook,
              data: dialogData,
            }}
            options={{
              onSuccess: () => handleDialogSubmit(true),
              onError: () => handleDialogSubmit(false),
              onClose: handleDialogClose,
            }}
          />
        )}

        <Paper elevation={0}>
          <StyledDataGrid
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
            onCellClick={handleCellClick}
            // onRowClick={handleRowClick}
            pageSizeOptions={[5]}
            onRowSelectionModelChange={handleRowSelectionModelChange}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnMenu
            sx={{
              // remove the focus outline
              '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                outline: 'none !important',
              },
              height: selectedRows.length > LIMIT_SELECTION ? '410px' : '380px',
            }}
            slots={{
              toolbar:
                selectedRows.length > LIMIT_SELECTION
                  ? () => CustomToolbar(handleClickDeleteMultiple)
                  : null,
              pagination: CustomPagination,
            }}
            getRowClassName={(params) =>
              params.id === selectedEvent && type === 'Event' ? 'selected-row' : ''
            }
          />
        </Paper>

        <DeleteDialog
          open={isDialogOpen}
          type={type}
          handleClose={() => {
            setIsDialogOpen(false);
          }}
          handleSubmit={handleDeleteMultiple}
          multipleDelete={selectedRows.length > 1}
        />
      </div>
    </>
  );
}

export default BaseDataGrid;
