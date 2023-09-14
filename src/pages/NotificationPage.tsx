import { useNavigate, useParams } from 'react-router-dom';
import NotificationForm from '../components/notification-types/form';
import { ID } from '../interfaces';

interface NotificationPageProps {
  operation: 'Add' | 'Edit';
}

function NotificationPage({ operation }: NotificationPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/');
  }

  return <NotificationForm id={id as ID} operation={operation} />;
}

export default NotificationPage;
