import React from "react";
import { Card, Container, Grid, Typography } from "@mui/material";
import Icon from "../../assets/gosaas-icon-red.webp";
import LoginForm, { User } from "./LoginForm"; // Import the LoginForm component

function Login() {
  const handleSubmit = (user: User) => {
    // Handle form submission here, e.g., send data to the server
    console.log("Submitted user data:", user);
  };

  return (
    <Card sx={{ py: 4, px: 6, maxWidth: 400, width: "100%" }}>
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <img src={Icon} alt="icon" style={{ maxWidth: "100%" }} />
        </Grid>

        <LoginForm onSubmit={handleSubmit} />

        <Typography component="p" sx={{ mt: 2, textAlign: "center" }}>
          Forgot password?
        </Typography>
      </Container>
    </Card>
  );
}

export default Login;
