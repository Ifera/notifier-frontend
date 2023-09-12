import { Box, Container } from '@mui/material';
import Application from '../components/application';
import Event from '../components/event';

import { useState } from 'react';
import ToolBar from '../common/toolbar';
import NotificationType from '../components/notification-types';
import { ApplicationQuery, ID, NullableID } from '../interfaces';

const cardsPerPage = 3;

function Dashboard() {
  const [selectedApp, setSelectedApp] = useState<NullableID>(null);
  const [selectedEvent, setSelectedEvent] = useState<NullableID>(null);
  const [selectedNotif, setSelectedNotif] = useState<NullableID>(null);

  const [query, setQuery] = useState<ApplicationQuery>({
    pageNumber: 0,
    pageSize: cardsPerPage,
  });

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
      <Container>
        <ToolBar title='Applications' query={query} setQuery={setQuery} />
        <Application
          onAppSelect={handleAppSelect}
          query={query}
          setQuery={setQuery}
          cardsPerPage={cardsPerPage}
        />

        {selectedApp && (
          <Event application={selectedApp} onEventSelect={handleEventSelect} />
        )}

        {selectedEvent && (
          <Box my={5}>
            <NotificationType
              event={selectedEvent}
              onNotificationSelect={handleNotifiSelect}
            />
          </Box>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
