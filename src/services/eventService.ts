import { Event } from '../interfaces';
import APIClient from './apiClient';

export default new APIClient<Event>('events');
