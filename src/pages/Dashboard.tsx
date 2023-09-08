import { Container } from "@mui/material";
import Application from "../components/application";
import Event from "../components/event";

import { useState } from "react";

function Dashboard() {
  const [eventId, setEventId] = useState("");

  return (
    <>
      <Container>
        <Application setEventId={setEventId} />
        {/* TODO: IMPROVE THE LOGIC */}
        {eventId && <Event application={eventId} />}
        {/* <Box mt={2}>
          <NotificationTyspe />
        </Box> */}
      </Container>
    </>
  );
}

export default Dashboard;
