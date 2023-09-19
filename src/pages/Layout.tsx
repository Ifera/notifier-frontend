import { AppBar, Box, Button, Grid, Toolbar } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Logo from '../assets/icon.svg';
import Footer from '../common/footer';

const Layout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <AppBar position='static'>
        <Toolbar color='primary'>
          <Link to='/'>
            <img src={Logo} alt='logo' />
          </Link>
          <Grid container justifyContent='flex-end'>
            <Button sx={{ color: 'white' }} onClick={handleClick}>
              Logout
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default Layout;
