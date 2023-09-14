import { Alert } from '@mui/material';
import Loading from '../../../common/loading';
import useEdit from '../../../hooks/useEdit';
import useGet from '../../../hooks/useGet';
import { ID, NotificationType, Query } from '../../../interfaces';
import notificationService from '../../../services/notificationService';
import BaseForm from './BaseForm';

interface EditFormProps {
  id: ID;
}

function EditForm({ id }: EditFormProps) {
  const query = { notification: id };
  const editHook = useEdit(notificationService, query as Query); // ignore query in this case

  const { data, isLoading, error } = useGet(notificationService, id);

  if (error) {
    return (
      <Alert severity='error' sx={{ marginTop: 2 }}>
        An error occurred while loading the notification
      </Alert>
    );
  }

  if (isLoading) {
    return <Loading isLoading />;
  }

  if (!data) {
    return (
      <Alert severity='error' sx={{ marginTop: 2 }}>
        The notification returned with empty data.
      </Alert>
    );
  }

  const { name, description, template_subject, template_body } =
    data as NotificationType;

  return (
    <BaseForm
      id={id}
      operation='Edit'
      hook={editHook}
      initialData={{
        name,
        description,
        template_subject,
        template_body,
      }}
    />
  );
}

export default EditForm;
