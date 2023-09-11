import { Alert, Box } from '@mui/material';
import { useState } from 'react';
import useDelete from '../../hooks/useDelete';
import useEdit from '../../hooks/useEdit';
import useGetAll from '../../hooks/useGetAll';
import {
  ApplicationQuery,
  FetchResponse,
  Application as IApplication,
} from '../../interfaces';
import applicationService from '../../services/applicationService';
import ApplicationCarousel from './ApplicationCarousel';

// TODO: MOVE TO CONFIG FILE
const cardsPerPage = 3;

interface ApplicationProps {
  onEventIdChange: (id: string | number) => void;
}

function Application({ onEventIdChange }: ApplicationProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const query: ApplicationQuery = {
    pageNumber: currentPage,
    pageSize: cardsPerPage,
  };

  const { data, isLoading, error } = useGetAll(applicationService, query);

  if (error)
    return (
      <Alert severity='error'>
        An error occurred while loading the applications
      </Alert>
    );

  const editHook = useEdit(applicationService, query);
  const delHook = useDelete(applicationService);

  if (delHook.error) {
    return (
      <Alert severity='error'>
        An error occurred while deleting the application
      </Alert>
    );
  }

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCardClick = (cardId: string | number) => {
    onEventIdChange(cardId);
  };

  return (
    <Box>
      <ApplicationCarousel
        data={data as FetchResponse<IApplication>}
        cardsPerPage={cardsPerPage}
        isLoading={isLoading}
        onCardClick={handleCardClick}
        onPageChange={onPageChange}
      />
    </Box>
  );
}

export default Application;
