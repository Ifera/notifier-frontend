import { Box } from '@mui/material';

function ErrorPage() {
  return (
    <Box
      sx={{
        background: '#EBF5FF',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          paddingTop: '50vh',
          color: '#001E3C',
        }}
      >
        <b>404</b>
        <span style={{ margin: '0 10px' }}>|</span> This page could not be found
      </Box>
    </Box>
  );
}

export default ErrorPage;
