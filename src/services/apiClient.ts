import axios, { AxiosRequestConfig } from 'axios';
import { FetchResponse, ID } from '../interfaces';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  params: {},
});

class APIClient<T> {
  endpoint: string;
  queryKey: string[];

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.queryKey = endpoint.split('/').filter((s) => s !== '');
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: ID) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id)
      .then((res) => res.data);
  };

  post = (data: Partial<T>) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  patch = (id: ID, data: Partial<T>) => {
    return axiosInstance
      .patch<T>(this.endpoint + '/' + id, data)
      .then((res) => res.data);
  };

  delete = (id: ID) => {
    return axiosInstance
      .delete(this.endpoint + '/' + id)
      .then((res) => res.data);
  };

  deleteAll = (ids: ID[]) => {
    return axiosInstance
      .delete(this.endpoint, { data: { ids } })
      .then((res) => res.data);
  };
}

export default APIClient;
