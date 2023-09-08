import { SyntheticEvent } from "react";
import { Button, Grid } from "@mui/material";
import TextInput from "../../common/TextInput";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

export type User = {
  email: string;
  password: string;
};

interface LoginFormProps {
  formData: User;
  formErrors: { email: string; password: string };
  onInputChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

const LoginForm = ({
  formData,
  formErrors,
  onInputChange,
  onSubmit,
}: LoginFormProps) => {
  const handleInputChange = (e: SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    const { name, value } = inputElement;
    onInputChange(name, value);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
      <TextInput
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        startIcon={<EmailIcon />}
        error={formErrors.email !== ""}
        helperText={formErrors.email}
      />
      <TextInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        type="password"
        startIcon={<LockIcon />}
        error={formErrors.password !== ""}
        helperText={formErrors.password}
      />
      <Button
        variant="contained"
        color="primary"
        type="button"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Grid>
  );
};

export default LoginForm;
