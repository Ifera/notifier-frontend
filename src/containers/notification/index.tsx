import { Alert, Box } from '@mui/material';
import { useEffect } from 'react';
import { useBetween } from 'use-between';
import GlobalState from '../../GlobalState';
import ToolBar from '../../common/toolbar';
import NotificationType from '../../components/notification-types';
import useGetAll from '../../hooks/useGetAll';
import { ID, NotificationTypeQuery } from '../../interfaces';
import notificationService from '../../services/notificationService';

interface NotificationTypeContainerProps {
  selectedEvent: ID;
  selectedEventName: string;
  onNotificationSelect: (id: ID, name: string) => void;
}

function NotificationTypeContainer({
  selectedEvent,
  selectedEventName,
  onNotificationSelect,
}: NotificationTypeContainerProps) {
  const { notifQuery, setNotifQuery: setQuery } = useBetween(GlobalState);
  const query = notifQuery as NotificationTypeQuery;

  useEffect(() => {
    if (query.event === selectedEvent) return;

    setQuery((prev) => ({ ...prev, event: selectedEvent, pageNumber: 1 }));
  }, [selectedEvent]);

  if (!query.event) {
    query.event = selectedEvent;
  }

  const { data, isLoading } = useGetAll(notificationService, query);
  const totalCount = data?.total_count || 0;

  return (
    <>
      <ToolBar
        type='Notification'
        query={query}
        setQuery={setQuery}
        service={notificationService}
        parentId={selectedEvent}
        parentName={selectedEventName}
        totalCount={totalCount}
      />

      <Box mt={4}>
        {totalCount === 0 && !isLoading ? (
          <Alert severity='warning'>
            {query.like || query.isActive !== undefined
              ? 'No notification types found for the selected filters.'
              : 'No notification types found. Please add a new notification type by clicking on the (+) button above.'}
          </Alert>
        ) : (
          <NotificationType
            query={query as NotificationTypeQuery}
            setQuery={setQuery}
            onNotificationSelect={onNotificationSelect}
          />
        )}
      </Box>
    </>
  );
}

export default NotificationTypeContainer;
