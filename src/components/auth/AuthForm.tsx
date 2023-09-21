import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Alert, Box, Button, Grid, Link, Typography } from '@mui/material';
import { SyntheticEvent } from 'react';
import TextInput from '../../common/text/input/TextInput';

export type User = {
  email: string;
  password: string;
};

interface AuthFormProps {
  formData: User;
  formErrors: string;
  onInputChange: (name: string, value: string) => void;
  onSubmit: () => void;
  formType: 'login' | 'register';
}

const AuthForm = ({
  formData,
  formErrors,
  onInputChange,
  onSubmit,
  formType,
}: AuthFormProps) => {
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
        {formErrors && (
          <Alert severity='error' sx={{ my: 2 }}>
            {formErrors}
          </Alert>
        )}
        <TextInput
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          startIcon={<EmailIcon />}
          type='email'
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
          sx={{ mt: 4 }}
        >
          {formType === 'login' ? 'Login' : 'Register'}
        </Button>

        <Box pt={3}>
          {formType === 'login' ? (
            <Typography variant='body2' color='text.secondary'>
              Don't have an account? <Link href='/register'>Register</Link>
            </Typography>
          ) : (
            <Typography variant='body2' color='text.secondary'>
              Already have an account? <Link href='/login'>Login</Link>
            </Typography>
          )}
        </Box>
      </Grid>
    </form>
  );
};

export default AuthForm;
