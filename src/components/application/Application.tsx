import { AppBar, Toolbar, Typography } from "@mui/material";
import ApplicationCard from "./ApplicationCard";

const Application = () => {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Applications
          </Typography>
        </Toolbar>
      </AppBar>

      <ApplicationCard />
    </>
  );
};

export default Application;
