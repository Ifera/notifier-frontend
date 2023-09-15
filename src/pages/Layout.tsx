import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Logo from '../assets/icon.svg';

const Layout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <>
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

      <Outlet />
    </>
  );
};

export default Layout;
