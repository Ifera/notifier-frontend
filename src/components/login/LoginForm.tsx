// LoginForm.tsx
import { SyntheticEvent, useState } from "react";
import { FormControl, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import TextInput from "../../common/TextInput";

interface LoginFormProps {
  onSubmit: (user: User) => void;
}

// TODO: Extract the User type Logic
export interface User {
  email: string;
  password: string;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit({ email, password });
  };

  return (
    <FormControl fullWidth>
      <TextInput
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e: SyntheticEvent) => {
          const target = e.target as HTMLInputElement;
          setEmail(target.value);
        }}
        required
        startIcon={<EmailIcon />}
        sx={{ mt: 2 }}
      />

      <TextInput
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e: SyntheticEvent) => {
          const target = e.target as HTMLInputElement;
          setPassword(target.value);
        }}
        required
        type="password"
        startIcon={<LockIcon />}
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        type="button"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </FormControl>
  );
};

export default LoginForm;
