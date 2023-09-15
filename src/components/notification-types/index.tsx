import DataGrid from '../../common/data-grid';
import { ID, NotificationTypeQuery } from '../../interfaces';
import notificationService from '../../services/notificationService';

interface NotificationTypeProps {
  query: NotificationTypeQuery;
  onNotificationSelect: (id: ID, name: string) => void;
}

function NotificationType({
  query,
  onNotificationSelect,
}: NotificationTypeProps) {
  return (
    <DataGrid
      type='Notification'
      service={notificationService}
      query={query}
      onSelect={onNotificationSelect}
    />
  );
}

export default NotificationType;
