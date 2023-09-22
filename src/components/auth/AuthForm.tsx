import { Box, Grid, Link, Typography } from '@mui/material';
import Form, { FormSubmitOptions } from '../../common/form';
import { FormData } from '../../common/form/BaseForm';

interface AuthFormProps {
  type: 'login' | 'register';

  onSubmit: (data: FormData, options: FormSubmitOptions) => void;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const formData: FormData = {
    auth: {
      email: '',
      password: '',
    },
  };

  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ mb: 2 }}>
      <Form
        formData={formData}
        btnText={type === 'login' ? 'Login' : 'Register'}
        onSubmit={onSubmit}
      />

      <Box pt={1}>
        {type === 'login' ? (
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
  );
};

export default AuthForm;
