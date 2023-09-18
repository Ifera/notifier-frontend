import {
  GridColDef,
  GridRowParams,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { Delete } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import {
  Event,
  NotificationType,
  Properties,
  UseDeleteHookResult,
  UseEditHookResult,
} from '../../../interfaces';
import ActionButtons from '../../buttons/ActionButtons';

interface getColumnsProps {
  type: 'App' | 'Event' | 'Notification';
  editHook: UseEditHookResult;
  delHook: UseDeleteHookResult;
  disableActionBtns: boolean;
  onClickEdit: (data: Properties) => void;
  onClickDelete?: (data: Properties) => void;
}

export function getColumns({
  type,
  editHook,
  delHook,
  disableActionBtns,
  onClickEdit,
  onClickDelete,
}: getColumnsProps): GridColDef[] {
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

        return (
          <ActionButtons
            type={type}
            data={row}
            editHook={editHook}
            delHook={delHook}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            disabled={disableActionBtns}
          />
        );
      },
    },
  ];
}

// ----------------------------------------------

export const CustomToolbar = (onClickDelete: () => void) => {
  return (
    <GridToolbarContainer>
      <IconButton color='error' size='small' onClick={onClickDelete}>
        <Delete sx={{ fontSize: '16px', marginRight: '4px' }} />
        <Typography
          variant='body1'
          sx={{ fontSize: '0.8125rem', fontWeight: '500' }}
        >
          DELETE
        </Typography>
      </IconButton>
    </GridToolbarContainer>
  );
};
