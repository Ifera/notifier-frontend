import { Card, Container, Grid } from '@mui/material';
import { useState } from 'react';
import { ZodError } from 'zod';
import Icon from '../../assets/gosaas-icon-red.webp';
import { userSchema } from '../../validation/schema';
import LoginForm, { User } from './LoginForm';

function Login() {
  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<User>({
    email: '',
    password: '',
  });

  const onInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validateForm = () => {
    try {
      userSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const emailError = error.errors.find((e) => e.path[0] === 'email');
        const passwordError = error.errors.find(
          (e) => e.path[0] === 'password'
        );
        setFormErrors({
          email: emailError?.message || '',
          password: passwordError?.message || '',
        });
        return false;
      }
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Submitted user data:', formData);
    }
  };

  return (
    <Card sx={{ py: 4, px: 2, mx: 2, maxWidth: 400, width: '100%' }}>
      <Container>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ mb: 2 }}
        >
          <img src={Icon} alt='icon' style={{ maxWidth: '100%' }} />
        </Grid>

        <LoginForm
          formData={formData}
          formErrors={formErrors}
          onInputChange={onInputChange}
          onSubmit={handleSubmit}
        />
      </Container>
    </Card>
  );
}

export default Login;
