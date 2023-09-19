import { AuthResponse } from '../hooks/useAuth';
import { User } from '../interfaces';
import APIClient from './apiClient';

const loginClient = new APIClient<User, AuthResponse>('auth');

const registerClient = new APIClient<User, AuthResponse>('auth/register');

export default {
  login: loginClient,
  register: registerClient,
};
