import { Alert, Box } from '@mui/material';
import { useState } from 'react';
import Dialog, { DialogProps } from '../../common/dialog';
import useDelete from '../../hooks/useDelete';
import useEdit from '../../hooks/useEdit';
import {
  ApplicationQuery,
  FetchResponse,
  Application as IApplication,
  ID,
  Properties,
} from '../../interfaces';
import applicationService from '../../services/applicationService';
import ApplicationCarousel from './ApplicationCarousel';

interface ApplicationProps {
  data: FetchResponse<IApplication> | undefined;
  isLoading: boolean;
  error: Error | null;
  query: ApplicationQuery;
  setQuery: React.Dispatch<React.SetStateAction<ApplicationQuery>>;
  cardsPerPage: number;
  onAppSelect: (id: ID, name: string) => void;
}

function Application({
  data,
  isLoading,
  error,
  query,
  setQuery,
  cardsPerPage,
  onAppSelect,
}: ApplicationProps) {
  const [dialogProps, setDialogProps] = useState<DialogProps>({
    open: false,
    type: 'App',
  });

  const [dialogData, setDialogData] = useState<Properties | null>(null);

  const editHook = useEdit(applicationService, query);
  const delHook = useDelete(applicationService);

  if (error) {
    return (
      <Alert severity="error" sx={{ marginTop: 2 }}>
        An error occurred while loading the applications
      </Alert>
    );
  }

  if (delHook.error) {
    return (
      <Alert severity="error" sx={{ marginTop: 2 }}>
        An error occurred while deleting the application
      </Alert>
    );
  }

  if (data?.results.length === 0) {
    return (
      <Alert severity="warning" sx={{ marginTop: 2 }}>
        {query.like || query.isActive !== undefined
          ? 'No applications found for the selected filters.'
          : 'No applications found. Please click the (+) button above to add a new application.'}
      </Alert>
    );
  }

  const onPageChange = (newPage: number) => {
    setQuery({ ...query, pageNumber: newPage });
  };

  const handleCardClick = (cardId: ID, name: string) => {
    onAppSelect(cardId, name);
  };

  const handleDialogClose = () => {
    setDialogData(null);
    setDialogProps({ ...dialogProps, open: false });
  };

  const handleClickEditBtn = (data: Properties) => {
    setDialogData(data);
    setDialogProps({ ...dialogProps, open: true });
  };

  const handleDialogSubmit = (success: boolean) => {
    if (!success) return;

    handleDialogClose();
  };

  return (
    <Box>
      {dialogData && (
        <Dialog
          {...dialogProps}
          operation={{
            type: 'Edit',
            editHook,
            data: dialogData,
          }}
          options={{
            onSuccess: () => handleDialogSubmit(true),
            onError: () => handleDialogSubmit(false),
            onClose: handleDialogClose,
          }}
        />
      )}

      <ApplicationCarousel
        data={data as FetchResponse<IApplication>}
        cardsPerPage={cardsPerPage}
        editHook={editHook}
        delHook={delHook}
        isLoading={isLoading}
        onCardClick={handleCardClick}
        onPageChange={onPageChange}
        onClickEditBtn={handleClickEditBtn}
      />
    </Box>
  );
}

export default Application;
