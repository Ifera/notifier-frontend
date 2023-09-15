import { Box } from '@mui/material';
import { useState } from 'react';
import ToolBar from '../../common/toolbar';
import Application from '../../components/application';
import { APPS_PAGE_SIZE } from '../../constants';
import useGetAll from '../../hooks/useGetAll';
import { ID, Query } from '../../interfaces';
import applicationService from '../../services/applicationService';

interface ApplicationContainerProps {
  onAppSelect: (id: ID) => void;
}

function ApplicationContainer({ onAppSelect }: ApplicationContainerProps) {
  const [query, setQuery] = useState<Query>({
    pageNumber: 1,
    pageSize: APPS_PAGE_SIZE,
  });

  const { data, isLoading, error } = useGetAll(applicationService, query);

  return (
    <>
      <ToolBar
        type='App'
        query={query}
        setQuery={setQuery}
        service={applicationService}
        totalCount={data?.total_count}
      />
      <Box mt={5}>
        <Application
          data={data}
          isLoading={isLoading}
          error={error}
          onAppSelect={onAppSelect}
          query={query}
          setQuery={setQuery}
          cardsPerPage={APPS_PAGE_SIZE}
        />
      </Box>
    </>
  );
}

export default ApplicationContainer;
