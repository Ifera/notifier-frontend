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

export interface NotificationQuery extends BaseQuery {
  event: string | number;
}
