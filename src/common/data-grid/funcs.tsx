import { Switch } from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useQueryClient } from '@tanstack/react-query';
import { MouseEvent } from 'react';
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import { ActionMap, EventRow, NotificationRow } from './entities';

function getColumns(type: string, action: ActionMap): GridColDef[] {
  const queryClient = useQueryClient();

  return [
    {
      field: type.toLowerCase(),
      headerName: type,
      minWidth: 100,
      flex: 1,
      hideable: false,
    },
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
      hideable: false,
      renderCell: ({
        row,
      }: Partial<GridRowParams<EventRow | NotificationRow>>) => {
        if (!row) return null;

        const onClick = (e: MouseEvent, type: 'edit' | 'delete' | 'switch') => {
          e.stopPropagation();

          if (type === 'switch') {
            const t = e.target as HTMLInputElement;
            action.onClickSwitch(row.id, t.checked);
            return;
          }

          const actionMap = {
            edit: action.onClickEdit,
            delete: action.onClickDelete,
          };

          actionMap[type](row.id);
        };

        return (
          <>
            <EditButton onClick={(e) => onClick(e, 'edit')} />
            <DeleteButton onClick={(e) => onClick(e, 'delete')} />
            <Switch
              onClick={(e) => onClick(e, 'switch')}
              checked={row.is_active}
            />
          </>
        );
      },
    },
  ];
}

export { getColumns };
