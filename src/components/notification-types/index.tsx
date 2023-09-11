import DataGrid from '../../common/data-grid';
import { ID } from '../../interfaces';
import notificationService from '../../services/notificationService';

interface NotificationTypeProps {
  event: ID;
  onNotificationSelect: (id: ID) => void;
}

function NotificationType({
  event,
  onNotificationSelect,
}: NotificationTypeProps) {
  return (
    <DataGrid
      id={event}
      type='Notification'
      service={notificationService}
      onSelect={onNotificationSelect}
    />
  );
}

export default NotificationType;
