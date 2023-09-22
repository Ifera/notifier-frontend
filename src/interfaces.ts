import { z } from 'zod';
import useAdd from './hooks/useAdd';
import useDelete from './hooks/useDelete';
import useDeleteAll from './hooks/useDeleteAll';
import useEdit from './hooks/useEdit';
import useGetAll from './hooks/useGetAll';
import useGetById from './hooks/useGetById';
import APIClient from './services/apiClient';
import { formDataSchema } from './utils/validation/schema';

// ----------------------------------------------

export type ID = number | string;
export type NullableID = ID | null;

// ----------------------------------------------

export interface BaseQuery {
  like?: string;
  pageSize?: number;
  pageNumber?: number;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: number;
}

export interface ApplicationQuery extends BaseQuery {}

export interface EventQuery extends BaseQuery {
  application: ID;
}

export interface NotificationTypeQuery extends BaseQuery {
  event: ID;
}

export type Query = ApplicationQuery | EventQuery | NotificationTypeQuery;

// ----------------------------------------------

interface BaseProperties {
  id: ID;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

export interface Application extends BaseProperties {}

export interface PApplication extends Partial<Application> {}

export interface Event extends BaseProperties {
  application: ID;
}

export interface PEvent extends Partial<Event> {}

export interface NotificationType extends BaseProperties {
  event: ID;
  template_subject: string;
  template_body: string;
  tags: string[];
}

export interface PNotificationType extends Partial<NotificationType> {}

export type Properties = Application | Event | NotificationType;
export type PProperties = PApplication | PEvent | PNotificationType;

// ----------------------------------------------

export interface User {
  email: string;
  password: string;
}

// ----------------------------------------------

export interface FetchResponse<T> {
  current_page: number;
  last_page: number;
  total_count: number;
  results: T[];
}

// ----------------------------------------------

export interface ActionMap {
  onClickEdit?: (id: ID) => void;
  onClickDelete?: (id: ID) => void;
  onClickSwitch?: (id: ID, value: boolean) => void;
}

// ----------------------------------------------

export type UseAddHookResult = ReturnType<typeof useAdd>;
export type UseEditHookResult = ReturnType<typeof useEdit>;
export type UseDeleteHookResult = ReturnType<typeof useDelete>;
export type UseDeleteAllHookResult = ReturnType<typeof useDeleteAll>;
export type UseGetAllHookResult = ReturnType<typeof useGetAll>;
export type UseGetByIdHookResult = ReturnType<typeof useGetById>;

// ----------------------------------------------

export type Service = APIClient<Properties, Properties>;

// ----------------------------------------------

export interface EventParamProp {
  target: { value: string };
}

// ----------------------------------------------

export type FormDataSchemaType = z.infer<typeof formDataSchema>;

// ----------------------------------------------
