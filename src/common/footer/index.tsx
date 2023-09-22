import { Box, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#F3F7FD',
        boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.05)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      py={1}
      px={6}
    >
      <Typography variant="body2">
        © 2023{' '}
        <Link href="https://www.gosaas.io/" target="_blank" rel="noopener">
          GoSaaS, Inc.
        </Link>{' '}
        Version 0.1.0
      </Typography>
    </Box>
  );
};

export default Footer;
