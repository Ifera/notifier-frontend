import { MouseEvent, useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridRowParams,
  useGridApiRef,
} from '@mui/x-data-grid';

import { Switch } from '@mui/material';

import EditButton from '../../common/buttons/EditButton';
import DeleteButton from '../../common/buttons/DeleteButton';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';

const columns: GridColDef[] = [
  { field: 'event', headerName: 'Event', minWidth: 100, flex: 1 },
  {
    field: 'description',
    headerName: 'Description',
    sortable: false,
    minWidth: 600,
    flex: 1,
  },
  {
    field: 'action',
    headerName: 'Action',
    minWidth: 150,
    sortable: false,
    align: 'left',
    flex: 1,
    renderCell: ({ row }: Partial<GridRowParams>) => {
      const onClick = (e: MouseEvent) => {
        e.stopPropagation();
      };

      return (
        <>
          <EditButton onClick={onClick} />
          <DeleteButton onClick={onClick} />
          <Switch defaultChecked onClick={onClick} />
        </>
      );
    },
  },
];

const events = [
  'on_create_user',
  'on_update_user',
  'on_login',
  'on_logout',
  'on_enter',
  'on_exit',
  'on_message',
  'on_expiry',
  'on_open',
];

const rows = events.map((event, index) => {
  return {
    id: index,
    event,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };
});

function Event() {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      event: true,
      description: false,
      action: true,
    });

  const isMobile = useCheckMobileScreen();
  const apiRef = useGridApiRef();

  useEffect(() => {
    if (isMobile) {
      setColumnVisibilityModel({
        ...columnVisibilityModel,
        description: false,
      });
    } else {
      setColumnVisibilityModel({
        ...columnVisibilityModel,
        description: true,
      });
    }

    apiRef.current.setColumnVisibility('description', !isMobile);
  }, [isMobile, apiRef]);

  return (
    <>
      <div style={{ height: '380px' }}>
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            columns: {
              columnVisibilityModel,
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
              outline: 'none !important',
            },
          }}
        />
      </div>
    </>
  );
}

export default Event;
