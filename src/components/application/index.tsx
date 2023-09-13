import { Alert, Box } from '@mui/material';
import { useState } from 'react';
import EditDialog, { EditDialogProps } from '../../common/edit/EditDialog';
import useDelete from '../../hooks/useDelete';
import useEdit from '../../hooks/useEdit';
import useGetAll from '../../hooks/useGetAll';
import {
  ApplicationQuery,
  FetchResponse,
  Application as IApplication,
  ID,
} from '../../interfaces';
import applicationService from '../../services/applicationService';
import ApplicationCarousel from './ApplicationCarousel';

interface ApplicationProps {
  query: ApplicationQuery;
  setQuery: React.Dispatch<React.SetStateAction<ApplicationQuery>>;
  cardsPerPage: number;
  onAppSelect: (id: ID) => void;
}

function Application({
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

  const { data, isLoading, error } = useGetAll(applicationService, query);

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

  const onPageChange = (newPage: number) => {
    setQuery({ ...query, pageNumber: newPage });
  };

  const handleCardClick = (cardId: ID) => {
    onAppSelect(cardId);
  };

  const handleEditDialogClose = () => {
    setDialogProps({ ...dialogProps, open: false, data: null });
  };

  const handleClickEditBtn = (data: IApplication) => {
    setDialogProps({ ...dialogProps, open: true, data });
  };

  if (!data?.results.length) {
    return (
      <Alert severity='info' sx={{ marginTop: 2 }}>
        There are no applications to display
      </Alert>
    );
  }

  return (
    <Box>
      <EditDialog
        {...dialogProps}
        onClose={handleEditDialogClose}
        editHook={editHook}
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
