import { GridColDef, GridRowParams } from '@mui/x-data-grid';

import {
  Event,
  NotificationType,
  Properties,
  UseDeleteHookResult,
  UseEditHookResult,
} from '../../interfaces';
import ActionButtons from '../buttons/ActionButtons';

function getColumns(
  type: string,
  editHook: UseEditHookResult,
  delHook: UseDeleteHookResult,
  onClickEdit: (data: Properties) => void
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

        return (
          <ActionButtons
            data={row}
            editHook={editHook}
            delHook={delHook}
            onClickEdit={onClickEdit}
          />
        );
      },
    },
  ];
}

export { getColumns };
