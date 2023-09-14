import { Event, PEvent } from '../interfaces';
import APIClient from './apiClient';

export default new APIClient<PEvent, Event>('events');
