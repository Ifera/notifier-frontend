import { AppBar, Toolbar, Typography } from "@mui/material";
import ApplicationCardContainer from "./ApplicationCardContainer";

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

      <ApplicationCardContainer />
    </>
  );
};

export default Application;
