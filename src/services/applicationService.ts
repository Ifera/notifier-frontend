import { Application, PApplication } from '../interfaces';
import APIClient from './apiClient';

export default new APIClient<PApplication, Application>('apps');
