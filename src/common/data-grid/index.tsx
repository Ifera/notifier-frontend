import { MouseEvent, useEffect, useState } from 'react';
import {
  DataGrid as DataGridX,
  GridColDef,
  GridColumnVisibilityModel,
  GridRowParams,
  useGridApiRef,
} from '@mui/x-data-grid';

import { Switch } from '@mui/material';

import EditButton from '../../common/buttons/EditButton';
import DeleteButton from '../../common/buttons/DeleteButton';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';

interface BaseRow {
  id: number;
  description: string;
}

export interface EventRow extends BaseRow {
  event: string;
}

export interface NotificationRow extends BaseRow {
  notification: string;
}

interface ActionProps {
  onClickEdit: (e: MouseEvent, row: EventRow | NotificationRow) => void;
  onClickDelete: (e: MouseEvent, row: EventRow | NotificationRow) => void;
  onClickSwitch: (e: MouseEvent, row: EventRow | NotificationRow) => void;
}

interface DataGridProps {
  type: 'Event' | 'Notification';
  action: ActionProps;
  rows: EventRow[] | NotificationRow[];
}

function DataGrid({ type, action, rows = [] }: DataGridProps) {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      [type]: true,
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

  const columns: GridColDef[] = [
    { field: type.toLowerCase(), headerName: type, minWidth: 100, flex: 1 },
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
      renderCell: ({
        row,
      }: Partial<GridRowParams<EventRow | NotificationRow>>) => {
        const onClick = (e: MouseEvent, t: 'edit' | 'delete' | 'switch') => {
          e.stopPropagation();

          if (!row) return;

          const actionMap = {
            edit: action.onClickEdit,
            delete: action.onClickDelete,
            switch: action.onClickSwitch,
          };

          actionMap[t](e, row);
        };

        return (
          <>
            <EditButton onClick={(e) => onClick(e, 'edit')} />
            <DeleteButton onClick={(e) => onClick(e, 'delete')} />
            <Switch defaultChecked onClick={(e) => onClick(e, 'switch')} />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ height: '380px' }}>
        <DataGridX
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

export default DataGrid;
