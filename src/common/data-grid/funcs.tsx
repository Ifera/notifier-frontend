import { Switch } from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { UseMutationResult } from '@tanstack/react-query';
import { MouseEvent } from 'react';

import {
  ActionMap,
  Event,
  NotificationType,
  PProperties,
  Properties,
} from '../../interfaces';
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';

function getColumns(
  type: string,
  useEdit: UseMutationResult<Properties, Error, PProperties>,
  useDel: UseMutationResult<string, Error, PProperties>,
  onClickEdit: (id: Event | NotificationType) => void,

  action?: ActionMap
): GridColDef[] {
  return [
    {
      field: 'name',
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
      }: Partial<GridRowParams<Event | NotificationType>>) => {
        if (!row) return null;

        const onClick = (e: MouseEvent, type: 'edit' | 'delete' | 'switch') => {
          e.stopPropagation();

          if (type === 'switch') {
            const t = e.target as HTMLInputElement;

            useEdit.mutate({
              id: row.id,
              is_active: t.checked,
            });

            if (action?.onClickSwitch) {
              action.onClickSwitch(row.id, t.checked);
            }

            return;
          }

          if (type === 'delete') {
            useDel.mutate({ id: row.id });

            if (action?.onClickDelete) {
              action.onClickDelete(row.id);
            }

            return;
          }

          if (type === 'edit') {
            onClickEdit(row);

            if (action?.onClickEdit) {
              action.onClickEdit(row.id);
            }

            return;
          }
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
