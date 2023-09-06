import { useEffect, useState } from 'react';
import {
  DataGrid as DataGridX,
  GridColumnVisibilityModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { createFakeServer } from '@mui/x-data-grid-generator';

import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import { DataGridProps } from './interfaces';
import { getColumns } from './funcs';

const { useQuery } = createFakeServer({}, { useCursorPagination: false });

function DataGrid({ type, action, rowss = [] }: DataGridProps) {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      [type]: true,
      description: false,
      action: true,
    });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // ----------------- TODO: IMPLEMENT LOGIC
  let { isLoading, rows, pageInfo } = useQuery(paginationModel);

  rows = rows.map((row, index) => {
    return {
      id: index,
      event: row.commodity,
      description: row.id,
    };
  });
  // -----------------

  const [rowCountState, setRowCountState] = useState(
    pageInfo?.totalRowCount || 0
  );

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

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined
        ? pageInfo?.totalRowCount
        : prevRowCountState
    );
  }, [pageInfo?.totalRowCount, setRowCountState]);

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
              columnVisibilityModel,
            },
          }}
          paginationMode='server'
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5]} // TODO: make this be configurable.. maybe? [5, 10]
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
