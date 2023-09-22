import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Popover, Typography } from '@mui/material';

interface UserProfilePopoverProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  email: string;
  onClose: () => void;
  onLogout: () => void;
}

const UserProfilePopover = ({
  open,
  anchorEl,
  email,
  onClose,
  onLogout,
}: UserProfilePopoverProps) => {
  return (
    <Popover
      id='menu-appbar'
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <AccountCircle sx={{ fontSize: '50px' }} />
        <Box sx={{ mt: 2 }}>
          <Typography variant='body1'>{email}</Typography>
        </Box>
        <Button
          variant='outlined'
          onClick={onLogout}
          sx={{
            mt: 2,
          }}
        >
          Logout
        </Button>
      </Box>
    </Popover>
  );
};

export default UserProfilePopover;
