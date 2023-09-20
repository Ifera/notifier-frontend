import { Box } from '@mui/material';
import Auth from '../components/auth';

export interface AuthType {
  authType: 'login' | 'register';
}

function AuthPage({ authType }: AuthType) {
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
      <Auth authType={authType} />
    </Box>
  );
}

export default AuthPage;
