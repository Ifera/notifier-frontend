import { Box, CircularProgress } from '@mui/material';

interface LoadingProps {
  isLoading?: boolean;
}

function Loading({ isLoading = true }: LoadingProps) {
  return (
    <Box
      position='fixed'
      top={0}
      left={0}
      width='100%'
      height='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      sx={{
        backgroundColor: 'rgba(25, 25, 25, 0.5)',
        zIndex: 9999,
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        opacity: isLoading ? 1 : 0,
        transform: `translateY(${isLoading ? 0 : '-100%'})`, // Slide in/out animation
        pointerEvents: isLoading ? 'auto' : 'none', // Allow interaction when visible
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
