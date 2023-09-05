import { AppBar, Toolbar, Typography } from "@mui/material";
import ApplicationCarousel from "./ApplicationCarousel";

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

      <ApplicationCarousel />
    </>
  );
};

export default Application;
