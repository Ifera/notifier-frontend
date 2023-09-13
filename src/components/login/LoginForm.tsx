import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Alert, Button, Grid } from '@mui/material';
import { SyntheticEvent } from 'react';
import TextInput from '../../common/TextInput';

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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ mb: 2 }}
      >
        {(formErrors.email || formErrors.password) && (
          <Alert severity='error' sx={{ my: 2 }}>
            {formErrors.email || formErrors.password}
          </Alert>
        )}

        <TextInput
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          startIcon={<EmailIcon />}
        />
        <TextInput
          label='Password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          type='password'
          startIcon={<LockIcon />}
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          fullWidth
          sx={{ mt: 4, mx: 3 }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Grid>
    </form>
  );
};

export default LoginForm;
