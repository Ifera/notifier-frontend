import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import ToolBar from '../../common/toolbar';
import NotificationType from '../../components/notification-types';
import { GRID_PAGE_SIZE } from '../../constants';
import { ID, NotificationTypeQuery, Query } from '../../interfaces';
import notificationService from '../../services/notificationService';

interface NotificationTypeContainerProps {
  selectedEvent: ID;
  onNotificationSelect: (id: ID) => void;
}

function NotificationTypeContainer({
  selectedEvent,
  onNotificationSelect,
}: NotificationTypeContainerProps) {
  const [query, setQuery] = useState<Query>({
    pageNumber: 1,
    pageSize: GRID_PAGE_SIZE,
    event: selectedEvent,
  });

  useEffect(() => {
    setQuery((prev) => ({ ...prev, event: selectedEvent }));
  }, [selectedEvent]);

  return (
    <>
      <ToolBar
        type='Notification'
        query={query}
        setQuery={setQuery}
        service={notificationService}
        parentId={selectedEvent}
      />
      <Box mt={4}>
        <NotificationType
          query={query as NotificationTypeQuery}
          onNotificationSelect={onNotificationSelect}
        />
      </Box>
    </>
  );
}

export default NotificationTypeContainer;
