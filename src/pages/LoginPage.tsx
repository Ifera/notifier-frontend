import { Box } from '@mui/material';
import Login from '../components/login';

function LoginPage() {
  return (
    <Box
      sx={{
        backgroundColor: '#FDFAFA',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Login />
    </Box>
  );
}

export default LoginPage;
