import { Box, Container } from '@mui/material';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBetween } from 'use-between';
import ApplicationContainer from '../containers/application';
import EventContainer from '../containers/event';
import NotificationTypeContainer from '../containers/notification';
import { ID, NullableID } from '../interfaces';

export const dashboardState = () => {
  const [selectedApp, setSelectedApp] = useState<NullableID>(null);
  const [selectedEvent, setSelectedEvent] = useState<NullableID>(null);
  const [selectedNotif, setSelectedNotif] = useState<NullableID>(null);

  const [names, setNames] = useState({
    app: '',
    event: '',
    notif: '',
  });

  return {
    selectedApp,
    selectedEvent,
    selectedNotif,
    names,
    setSelectedApp,
    setSelectedEvent,
    setSelectedNotif,
    setNames,
  };
};

function Dashboard() {
  const {
    selectedApp,
    selectedEvent,
    names,
    setSelectedApp,
    setSelectedEvent,
    setSelectedNotif,
    setNames,
  } = useBetween(dashboardState);

  const oldAppId = selectedApp;
  const navigate = useNavigate();

  const handleAppSelect = (id: ID, name: string) => {
    const newNames = { ...names };

    if (oldAppId !== id) {
      setSelectedEvent(null);
      setSelectedNotif(null);

      newNames.event = '';
      newNames.notif = '';
    }

    setSelectedApp(id);
    setNames((prev) => ({ ...prev, ...newNames, app: name }));
  };

  const handleEventSelect = (id: ID, name: string) => {
    setSelectedEvent(id);
    setNames((prev) => ({ ...prev, event: name }));
  };

  const handleNotifiSelect = (id: ID, name: string) => {
    setSelectedNotif(id);
    setNames((prev) => ({ ...prev, notif: name }));

    navigate(`/edit-notification/${id}`);
  };

  return (
    <>
      <Box mb={5}>
        <Container>
          <ApplicationContainer
            selectedApp={selectedApp}
            onAppSelect={handleAppSelect}
          />

          {selectedApp && (
            <EventContainer
              selectedApp={selectedApp}
              selectedAppName={names.app}
              selectedEvent={selectedEvent}
              onEventSelect={handleEventSelect}
            />
          )}

          {selectedEvent && (
            <Box my={4}>
              <NotificationTypeContainer
                selectedEvent={selectedEvent}
                selectedEventName={names.event}
                onNotificationSelect={handleNotifiSelect}
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
