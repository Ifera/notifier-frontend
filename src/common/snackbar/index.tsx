import { Snackbar as MuiSnackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ms from 'ms';
import { forwardRef } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  hideAfter?: number;
}

function Snackbar({
  open,
  message,
  severity,
  hideAfter = ms('5s'),
}: SnackbarProps) {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={hideAfter}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}

export default Snackbar;
