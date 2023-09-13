import { Alert, Box, Container } from '@mui/material';

import { useState } from 'react';
import ApplicationContainer from '../containers/application';
import EventContainer from '../containers/event';
import NotificationTypeContainer from '../containers/notification';
import { ID, NullableID } from '../interfaces';

function Dashboard() {
  const [selectedApp, setSelectedApp] = useState<NullableID>(null);
  const [selectedEvent, setSelectedEvent] = useState<NullableID>(null);
  const [selectedNotif, setSelectedNotif] = useState<NullableID>(null);

  const oldAppId = selectedApp;

  const handleAppSelect = (id: ID) => {
    if (oldAppId !== id) {
      setSelectedEvent(null);
      setSelectedNotif(null);
    }

    setSelectedApp(id);
  };

  const handleEventSelect = (id: ID) => {
    setSelectedEvent(id);
  };

  const handleNotifiSelect = (id: ID) => {
    setSelectedNotif(id);
  };

  return (
    <>
      <Box mb={5}>
        <Container>
          <ApplicationContainer onAppSelect={handleAppSelect} />

          {!selectedApp && (
            <Alert severity='info' sx={{ mt: 4 }}>
              Please select an application to display the events.
            </Alert>
          )}

          {selectedApp && (
            <EventContainer
              selectedApp={selectedApp}
              onEventSelect={handleEventSelect}
            />
          )}

          {selectedApp && !selectedEvent && (
            <Alert severity='info' sx={{ mt: 4 }}>
              Please select an event to display the notification types.
            </Alert>
          )}

          {selectedEvent && (
            <Box my={4}>
              <NotificationTypeContainer
                selectedEvent={selectedEvent}
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
