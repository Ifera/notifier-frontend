import { Switch } from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import { MouseEvent } from 'react';
import { ActionMap, EventRow, NotificationRow } from './interfaces';

function getColumns(type: string, action: ActionMap): GridColDef[] {
  return [
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
}

export { getColumns };
