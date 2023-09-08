import { Alert, Box } from '@mui/material';
import { useState } from 'react';
import useGetAll from '../../hooks/useGetAll';
import { FetchResponse, Application as IApplication } from '../../interfaces';
import applicationService from '../../services/applicationService';
import ApplicationCarousel from './ApplicationCarousel';

// TODO: MOVE TO CONFIG FILE
const cardsPerPage = 3;

interface ApplicationProps {
  onEventIdChange: (id: string | number) => void;
}

function Application({ onEventIdChange }: ApplicationProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, error } = useGetAll(applicationService, {
    pageNumber: currentPage,
    pageSize: cardsPerPage,
  });

  if (error)
    return (
      <Alert severity='error'>
        An error occurred while loading the applications
      </Alert>
    );

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
        onCardClick={handleCardClick}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default Application;
