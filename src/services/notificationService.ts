import { NotificationType, PNotificationType } from '../interfaces';
import APIClient from './apiClient';

export default new APIClient<PNotificationType | any, NotificationType>(
  'notification-types'
);
