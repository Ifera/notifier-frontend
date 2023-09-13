import { AppBar, Toolbar } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import Logo from '../assets/icon.svg';

const Layout = () => {
  return (
    <>
      <AppBar position='static'>
        <Toolbar color='primary'>
          <Link to='/'>
            <img src={Logo} alt='logo' />
          </Link>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Layout;
