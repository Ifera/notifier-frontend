import Preview from '../components/notification-types/preview/Preview';
import { ID } from '../interfaces';

interface NotificationPreviewProps {
  event: ID;
}

const NotificationPreview = ({ event }: NotificationPreviewProps) => {
  return <Preview event={event} />;
};

export default NotificationPreview;
