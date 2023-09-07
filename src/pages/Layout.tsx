import { AppBar, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Logo from "../assets/icon.svg";

const Layout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar color="primary">
          <img src={Logo}></img>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Layout;
