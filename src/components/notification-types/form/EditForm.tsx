import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import Loading from '../../../common/loading';
import { ValueProps } from '../../../common/preview-form/PreviewForm';
import useEdit from '../../../hooks/useEdit';
import useGetById from '../../../hooks/useGetById';
import { ID, NotificationType, Query } from '../../../interfaces';
import notificationService from '../../../services/notificationService';
import BaseForm from './BaseForm';

interface EditFormProps {
  id: ID;
}

function EditForm({ id }: EditFormProps) {
  const [initialData, setInitialData] = useState<ValueProps | null>(null);

  const editHook = useEdit(notificationService, id as Query); // treat id as query
  const { data, isLoading, error } = useGetById(notificationService, id);

  useEffect(() => {
    if (data) {
      const { name, description, template_subject, template_body } =
        data as NotificationType;

      setInitialData({
        name,
        description,
        template_subject,
        template_body,
      });
    }
  }, [data]);

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

  if (!initialData) {
    return (
      <Alert severity='error' sx={{ marginTop: 2 }}>
        The notification returned with empty data.
      </Alert>
    );
  }

  return (
    <BaseForm
      id={id}
      operation='Edit'
      hook={editHook}
      initialData={initialData}
    />
  );
}

export default EditForm;
