import { DataGrid, GridColDef, GridRowParams, GridToolbarContainer } from '@mui/x-data-grid';

import { Delete } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  isMobile: boolean;
  isTablet: boolean;
  onClickEdit: (data: Properties) => void;
  onClickDelete?: (data: Properties) => void;
}

export function getColumns({
  type,
  editHook,
  delHook,
  disableActionBtns,
  isMobile,
  isTablet,
  onClickEdit,
  onClickDelete,
}: getColumnsProps): GridColDef[] {
  return [
    {
      field: 'name',
      headerName: type,
      minWidth: isMobile ? 150 : isTablet ? 450 : 100,
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
      headerAlign: isMobile ? 'center' : 'left',
      minWidth: isMobile ? 10 : isTablet ? 100 : 200,
      sortable: false,
      align: isMobile ? 'center' : 'left',
      flex: 1,
      hideable: false,
      renderCell: ({ row }: Partial<GridRowParams<Event | NotificationType>>) => {
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
        <Typography variant='body1' sx={{ fontSize: '0.8125rem', fontWeight: '500' }}>
          DELETE
        </Typography>
      </IconButton>
    </GridToolbarContainer>
  );
};

// ----------------------------------------------

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-cell': {
    border: 'none ',
  },

  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#F0F0F0 !important',
    cursor: 'pointer',
  },

  '.selected-row': {
    backgroundColor: '#F0F0F0 !important',
    fontWeight: '500',
    borderTop: `1px solid #0060B9`,
    borderBottom: `1px solid #0060B9`,
  },
}));
