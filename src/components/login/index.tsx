import { Card, Container, Grid } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';
import Icon from '../../assets/gosaas-icon-red.webp';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/authService';
import { parseError } from '../../utils';
import { userSchema } from '../../validation/schema';
import LoginForm, { User } from './LoginForm';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState('');
  const authHook = useAuth(authService);

  const onInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors('');
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
        if (emailError) {
          setFormErrors(emailError.message);
        } else if (passwordError) {
          setFormErrors(passwordError.message);
        }
        return false;
      }
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      authHook.mutate(formData, {
        onSuccess: (data) => {
          if (!data.token) {
            setFormErrors('An error occurred while logging in');
            return;
          }
          localStorage.clear();
          localStorage.setItem('token', data.token);
          setFormErrors('');
          navigate('/');
        },
        onError: (error) => {
          setFormErrors(parseError(error));
        },
      });
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
