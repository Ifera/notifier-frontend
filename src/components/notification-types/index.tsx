import { Dispatch, SetStateAction } from 'react';
import DataGrid from '../../common/data-grid';
import { ID, NotificationTypeQuery, Query } from '../../interfaces';
import notificationService from '../../services/notificationService';

interface NotificationTypeProps {
  query: NotificationTypeQuery;
  setQuery: Dispatch<SetStateAction<Query>>;
  onNotificationSelect: (id: ID, name: string) => void;
}

function NotificationType({ query, setQuery, onNotificationSelect }: NotificationTypeProps) {
  return (
    <DataGrid
      type='Notification'
      service={notificationService}
      query={query}
      setQuery={setQuery}
      onSelect={onNotificationSelect}
    />
  );
}

export default NotificationType;
