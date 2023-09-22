import { AccountCircle } from '@mui/icons-material';
import { AppBar, Box, Grid, IconButton, Toolbar, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Logo from '../assets/icon.svg';
import Footer from '../common/footer';
import UserProfilePopover from '../common/popover/UserProfilePopover';

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
          <Tooltip title='GoSaaS'>
            <Link to='/'>
              <img src={Logo} alt='logo' />
            </Link>
          </Tooltip>
          <Grid container justifyContent='flex-end'>
            <Tooltip title='Profile'>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
                onClick={handlePopoverOpen}
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
        <UserProfilePopover
          open={popoverOpen}
          anchorEl={anchorEl}
          email={email}
          onClose={handlePopoverClose}
          onLogout={handleLogout}
        />
      </AppBar>

      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default Layout;
