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

// TODO: MOVE TO CONFIG FILE
const cardsPerPage = 3;

interface ApplicationProps {
  onAppSelect: (id: ID) => void;
}

function Application({ onAppSelect }: ApplicationProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const [dialogProps, setDialogProps] = useState<EditDialogProps>({
    open: false,
    type: 'App',
    data: null,
  });

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

  const handleCardClick = (cardId: ID) => {
    onAppSelect(cardId);
  };

  const handleEditDialogClose = () => {
    setDialogProps({ ...dialogProps, open: false, data: null });
  };

  const handleClickEditBtn = (data: IApplication) => {
    setDialogProps({ ...dialogProps, open: true, data });
  };

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
