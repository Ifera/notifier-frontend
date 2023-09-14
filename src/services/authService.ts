import { AuthResponse } from '../hooks/useAuth';
import { User } from '../interfaces';
import APIClient from './apiClient';

export default new APIClient<User, AuthResponse>('auth');
