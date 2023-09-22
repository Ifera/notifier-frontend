import { Alert, Box } from '@mui/material';
import { useBetween } from 'use-between';
import GlobalState from '../../GlobalState';
import ToolBar from '../../common/toolbar';
import Application from '../../components/application';
import { APPS_PAGE_SIZE } from '../../constants';
import useGetAll from '../../hooks/useGetAll';
import { ID, NullableID } from '../../interfaces';
import applicationService from '../../services/applicationService';

interface ApplicationContainerProps {
  selectedApp: NullableID;
  onAppSelect: (id: ID, name: string) => void;
}

function ApplicationContainer({ selectedApp, onAppSelect }: ApplicationContainerProps) {
  const { appQuery: query, setAppQuery: setQuery } = useBetween(GlobalState);
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

      <Box mt={4}>
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

      {!selectedApp && data?.total_count !== 0 && (
        <Alert severity='info' sx={{ mt: 4 }}>
          Please select an application to display the events.
        </Alert>
      )}
    </>
  );
}

export default ApplicationContainer;
