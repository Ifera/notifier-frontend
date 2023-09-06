export interface QueryParams {
  application: string | number;
  like?: string;
  pageSize?: number;
  pageNumber?: number;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: number;
}
