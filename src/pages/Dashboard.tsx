import { Box, Container } from '@mui/material';
import Event from '../components/event';
import NotificationType from '../components/notification-types';

function Dashboard() {
  return (
    <>
      <Container>
        <Event application={1} />
        {/* <Box mt={2}>
          <NotificationType />
        </Box> */}
      </Container>
    </>
  );
}

export default Dashboard;
