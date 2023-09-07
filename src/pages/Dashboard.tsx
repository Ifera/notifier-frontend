import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Event from "../components/event";
import Application from "../components/application";

import { useState } from "react";

function Dashboard() {
  const [eventId, setEventId] = useState("");
  return (
    <>
      <Container>
        <Application setEventId={eventId} />
        {eventId && <Event application={eventId} />}
        {/* <Box mt={2}>
          <NotificationType />
        </Box> */}
      </Container>
    </>
  );
}

export default Dashboard;
