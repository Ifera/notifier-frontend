import { Container } from '@mui/material';
import Application from '../components/application';
import Event from '../components/event';

import { useState } from 'react';
import ToolBar from '../common/toolbar';

function Dashboard() {
  const [eventId, setEventId] = useState<string | number>('');

  const handleEventIdChange = (id: string | number) => {
    setEventId(id);
  };

  return (
    <>
      <Container>
        <ToolBar />
        <Application onEventIdChange={handleEventIdChange} />

        {/* TODO: IMPROVE THE LOGIC */}
        {eventId && <Event application={eventId} />}
        {/* <Box mt={2}>
          <NotificationTyspe />
        </Box> */}
      </Container>
    </>
  );
}

export default Dashboard;
