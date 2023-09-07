import {
  DataGrid as DataGridX,
  GridPaginationModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import { ActionMap, Event, NotificationType } from '../../interfaces';
import { getColumns } from './funcs';

interface DataGridProps {
  type: 'Event' | 'Notification';
  action: ActionMap;
  isLoading: boolean;
  totalRowCount: number;
  rows: Event[] | NotificationType[];
  onPageChange: (pageNumber: number) => void;
}

function DataGrid({
  type,
  action,
  isLoading,
  totalRowCount,
  rows,
  onPageChange,
}: DataGridProps) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const isMobile = useCheckMobileScreen();
  const apiRef = useGridApiRef();

  useEffect(() => {
    apiRef.current.setColumnVisibility('description', !isMobile);
  }, [isMobile, apiRef]);

  const handlePageChange = (model: GridPaginationModel) => {
    onPageChange(model.page + 1); // updates the page state in the parent component
    setPaginationModel(model);
  };

  return (
    <>
      <div style={{ height: '380px' }}>
        <DataGridX
          apiRef={apiRef}
          rows={rows}
          columns={getColumns(type, action)}
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
          pageSizeOptions={[5]}
          checkboxSelection
          sx={{
            // remove the focus outline
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
