import { useEffect, useState } from 'react';
import {
  DataGrid as DataGridX,
  GridPaginationModel,
  useGridApiRef,
} from '@mui/x-data-grid';

import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import { DataGridProps } from './entities';
import { getColumns } from './funcs';

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

  const [rowCountState, setRowCountState] = useState(totalRowCount);

  const isMobile = useCheckMobileScreen();
  const apiRef = useGridApiRef();

  useEffect(() => {
    apiRef.current.setColumnVisibility('description', !isMobile);
  }, [isMobile, apiRef]);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalRowCount !== undefined ? totalRowCount : prevRowCountState
    );
  }, [totalRowCount, setRowCountState]);

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
          rowCount={rowCountState}
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
