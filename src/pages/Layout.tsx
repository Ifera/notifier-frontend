import { AccountCircle } from '@mui/icons-material';
import { AppBar, Box, Button, Grid, IconButton, Popover, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Logo from '../assets/icon.svg';
import Footer from '../common/footer';

const Layout = () => {
  const navigate = useNavigate();

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverOpen(false);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    handlePopoverClose();
  };

  const token = localStorage.getItem('token');
  const email = token ? JSON.parse(atob(token.split('.')[1])).email : '';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#F3F7FD',
      }}
    >
      <AppBar position='static' sx={{ backgroundColor: '#0060B9' }}>
        <Toolbar color='primary'>
          <Link to='/'>
            <img src={Logo} alt='logo' />
          </Link>
          <Grid container justifyContent='flex-end'>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
              onClick={handlePopoverOpen}
            >
              <AccountCircle />
            </IconButton>
          </Grid>
        </Toolbar>
        <Popover
          id='menu-appbar'
          anchorEl={anchorEl}
          open={popoverOpen}
          onClose={handlePopoverClose}
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
              onClick={handleLogout}
              sx={{
                mt: 2,
              }}
            >
              Logout
            </Button>
          </Box>
        </Popover>
      </AppBar>

      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default Layout;
