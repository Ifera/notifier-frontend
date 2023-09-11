import useDelete from './hooks/useDelete';
import useEdit from './hooks/useEdit';
import useGetAll from './hooks/useGetAll';

interface BaseQuery {
  like?: string;
  pageSize?: number;
  pageNumber?: number;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: number;
}

export interface ApplicationQuery extends BaseQuery {}

export interface EventQuery extends BaseQuery {
  application: string | number;
}

export interface NotificationTypeQuery extends BaseQuery {
  event: string | number;
}

export type Query = ApplicationQuery | EventQuery | NotificationTypeQuery;

// ----------------------------------------------

interface BaseProperties {
  id: number | string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

export interface Application extends BaseProperties {}

export interface PApplication extends Partial<Application> {}

export interface Event extends BaseProperties {
  application: number | string;
}

export interface PEvent extends Partial<Event> {}

export interface NotificationType extends BaseProperties {
  event: number | string;
}

export interface PNotificationType extends Partial<NotificationType> {}

export type Properties = Application | Event | NotificationType;
export type PProperties = PApplication | PEvent | PNotificationType;

// ----------------------------------------------

export interface FetchResponse<T> {
  current_page: number;
  last_page: number;
  total_count: number;
  results: T[];
}

// ----------------------------------------------

export interface ActionMap {
  onClickEdit?: (id: number | string) => void;
  onClickDelete?: (id: number | string) => void;
  onClickSwitch?: (id: number | string, value: boolean) => void;
}

// ----------------------------------------------

export type UseEditHookResult = ReturnType<typeof useEdit>;
export type UseDeleteHookResult = ReturnType<typeof useDelete>;
export type UseGetAllHookResult = ReturnType<typeof useGetAll>;
