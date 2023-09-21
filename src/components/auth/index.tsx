import { Card, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';
import Icon from '../../assets/gosaas-icon-red.webp';
import useAuth from '../../hooks/useAuth';
import { AuthType } from '../../pages/AuthPage';
import authService from '../../services/authService';
import { parseError } from '../../utils';
import { userSchema } from '../../utils/validation/schema';
import AuthForm, { User } from './AuthForm';

function Auth({ authType }: AuthType) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState('');

  const authHook = useAuth(
    authType === 'login' ? authService.login : authService.register
  );

  const onInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors('');
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decodedToken.exp * 1000;
    const isExpired = Date.now() - expirationTime > 0;

    if (isExpired) {
      localStorage.removeItem('token');
      return false;
    }

    return token !== null;
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
            setFormErrors('Something went wrong');
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

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [authHook, navigate]);

  return (
    <Card
      sx={{
        py: 8,
        px: 4,
        mx: 4,
        maxWidth: 450,
        width: '100%',
      }}
    >
      <Container>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ mb: 2 }}
        >
          <img src={Icon} alt='icon' style={{ maxWidth: '100%' }} />
        </Grid>
        {authType === 'login' ? (
          <AuthForm
            formData={formData}
            formErrors={formErrors}
            onInputChange={onInputChange}
            onSubmit={handleSubmit}
            formType={authType}
          />
        ) : (
          <AuthForm
            formData={formData}
            formErrors={formErrors}
            onInputChange={onInputChange}
            onSubmit={handleSubmit}
            formType={authType}
          />
        )}
      </Container>
    </Card>
  );
}

export default Auth;
