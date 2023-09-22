import { Card, Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/gosaas-icon-red.webp';
import { FormSubmitOptions } from '../../common/form';
import { FormData } from '../../common/form/BaseForm';
import useAuth from '../../hooks/useAuth';
import { User } from '../../interfaces';
import { AuthType } from '../../pages/AuthPage';
import authService from '../../services/authService';
import { parseError } from '../../utils';
import AuthForm from './AuthForm';

function Auth({ authType }: AuthType) {
  const navigate = useNavigate();

  const authHook = useAuth(authType === 'login' ? authService.login : authService.register);

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

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/', { replace: true });
    }
  }, [authHook, navigate]);

  const handleSubmit = (newData: FormData, { onSuccess, onError }: FormSubmitOptions) => {
    if (!newData.auth) return;

    const mutationData: User = {
      email: newData.auth.email,
      password: newData.auth.password,
    };

    authHook.mutate(mutationData, {
      onSuccess: (data) => {
        if (!data.token) {
          onError('Something went wrong');
          return;
        }

        localStorage.clear();
        localStorage.setItem('token', data.token);

        navigate('/', { replace: true });
        onSuccess(authType === 'login' ? 'Logged in successfully' : 'Registered successfully');
      },
      onError: (error) => {
        onError(parseError(error));
      },
    });
  };

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
        <Grid container justifyContent='center' alignItems='center' sx={{ mb: 2 }}>
          <img src={Icon} alt='icon' style={{ maxWidth: '100%' }} />
        </Grid>

        <AuthForm type={authType} onSubmit={handleSubmit} />
      </Container>
    </Card>
  );
}

export default Auth;
