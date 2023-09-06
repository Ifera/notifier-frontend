import { Card, Container, Grid, Typography } from "@mui/material";
import Icon from "../../assets/gosaas-icon-red.webp";
import LoginForm, { User } from "./LoginForm";
import { useState } from "react";
import { z, ZodError } from "zod";

// TODO: Extract this code to a separate file
const userSchema = z.object({
  email: z.string().email("Invalid email format").min(1),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

function Login() {
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const onInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    try {
      userSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const emailError = error.errors.find((e) => e.path[0] === "email");
        const passwordError = error.errors.find(
          (e) => e.path[0] === "password"
        );
        setFormErrors({
          email: emailError?.message || "",
          password: passwordError?.message || "",
        });
        return false;
      }
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Submitted user data:", formData);
    }
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

        <LoginForm
          formData={formData}
          formErrors={formErrors}
          onInputChange={onInputChange}
          onSubmit={handleSubmit}
        />

        <Typography component="p" sx={{ mt: 2, textAlign: "center" }}>
          Forgot password?
        </Typography>
      </Container>
    </Card>
  );
}

export default Login;
