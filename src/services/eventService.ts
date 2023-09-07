import { Event } from '../entities/Event';
import APIClient from './apiClient';

export default new APIClient<Event>('events');
