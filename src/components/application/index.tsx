import { Alert, Box } from '@mui/material';
import { useState } from 'react';
import EditDialog, {
  EditDialogProps,
  OnSubmitSuccessProps,
} from '../../common/edit/EditDialog';
import { EDIT_DIALOG_AUTO_CLOSE_DELAY } from '../../constants';
import useDelete from '../../hooks/useDelete';
import useEdit from '../../hooks/useEdit';
import {
  ApplicationQuery,
  FetchResponse,
  Application as IApplication,
  ID,
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
  const [dialogProps, setDialogProps] = useState<EditDialogProps>({
    open: false,
    type: 'App',
    operation: 'Edit',
    data: null,
  });

  const editHook = useEdit(applicationService, query);
  const delHook = useDelete(applicationService);

  if (error) {
    return (
      <Alert severity='error' sx={{ marginTop: 2 }}>
        An error occurred while loading the applications
      </Alert>
    );
  }

  if (delHook.error) {
    return (
      <Alert severity='error' sx={{ marginTop: 2 }}>
        An error occurred while deleting the application
      </Alert>
    );
  }

  if (!data?.results.length) {
    return (
      <Alert severity='warning' sx={{ marginTop: 2 }}>
        {query.like
          ? 'No such application exists.'
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

  const handleEditDialogClose = () => {
    setDialogProps({ ...dialogProps, open: false, data: null });
  };

  const handleClickEditBtn = (data: IApplication) => {
    setDialogProps({ ...dialogProps, open: true, data });
  };

  const handleSubmitSuccess = ({ cleanup }: OnSubmitSuccessProps) => {
    setTimeout(() => {
      handleEditDialogClose();
      cleanup(true);
    }, EDIT_DIALOG_AUTO_CLOSE_DELAY);
  };

  return (
    <Box>
      <EditDialog
        {...dialogProps}
        onClose={handleEditDialogClose}
        editHook={editHook}
        onSubmitSuccess={handleSubmitSuccess}
      />

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
