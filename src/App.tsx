import { Box, Container } from '@mui/material';
import './App.css';
import Event from './components/event';
import NotificationType from './components/notification-types';

function App() {
  return (
    <>
      <Container>
        <Event />
        <Box mt={2}>
          <NotificationType />
        </Box>
      </Container>
    </>
  );
}

export default App;
