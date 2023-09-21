import { useNavigate } from 'react-router-dom';
import { useBetween } from 'use-between';
import { FormData } from '../../../common/form/BaseForm';
import Loading from '../../../common/loading';
import useEdit from '../../../hooks/useEdit';
import useGetById from '../../../hooks/useGetById';
import { ID, NotificationType, Query } from '../../../interfaces';
import notificationService from '../../../services/notificationService';
import { snackbarState } from '../../../utils/SnackbarState';
import BaseForm from './BaseForm';

interface EditFormProps {
  id: ID;
}

function EditForm({ id }: EditFormProps) {
  const { handleErrorMessage } = useBetween(snackbarState);
  const navigate = useNavigate();

  const editHook = useEdit(notificationService, id as Query); // treat id as query
  const { data, isLoading, error } = useGetById(notificationService, id);

  if (error) {
    navigate('/');
    handleErrorMessage('An error occurred while loading the notification.');
  }

  if (isLoading) {
    return <Loading isLoading />;
  }

  if (!data) {
    navigate('/');
    handleErrorMessage('The notification returned with empty data.');

    return;
  }

  const d = data as NotificationType;
  const formData: FormData = {
    name: d.name,
    description: d.description,
    notification: {
      template_subject: d.template_subject,
      template_body: d.template_body,
    },
  };

  return (
    <BaseForm id={id} operation='Edit' hook={editHook} formData={formData} />
  );
}

export default EditForm;
