import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Event from "../components/event";
import Application from "../components/application";
import Logo from "../assets/icon.svg";

function Dashboard() {
  return (
    <>
      <AppBar position="static">
        <Toolbar color="primary">
          <img src={Logo}></img>
        </Toolbar>
      </AppBar>

      <Container>
        <Application />
        {/* <Event application={1} /> */}
        {/* <Box mt={2}>
          <NotificationType />
        </Box> */}
      </Container>
    </>
  );
}

export default Dashboard;
