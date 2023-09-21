import useAdd from '../../../hooks/useAdd';
import { ID } from '../../../interfaces';
import notificationService from '../../../services/notificationService';
import BaseForm from './BaseForm';

interface AddFormProps {
  id: ID;
}

function AddForm({ id }: AddFormProps) {
  const addHook = useAdd(notificationService);

  return <BaseForm id={id} operation='Add' hook={addHook} formData={null} />;
}

export default AddForm;
