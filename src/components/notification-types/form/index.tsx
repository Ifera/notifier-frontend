import { ID } from '../../../interfaces';
import AddForm from './AddForm';
import EditForm from './EditForm';

interface NotificationFormProps {
  id: ID;
  operation: 'Add' | 'Edit';
}

function NotificationForm({ id, operation }: NotificationFormProps) {
  if (operation === 'Add') {
    return <AddForm id={id} />;
  }

  return <EditForm id={id} />;
}

export default NotificationForm;
