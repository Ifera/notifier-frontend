import { NotificationType, PNotificationType } from '../interfaces';
import APIClient from './apiClient';

export default new APIClient<PNotificationType, NotificationType>(
  'notification-types'
);
