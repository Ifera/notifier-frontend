import axios, { AxiosRequestConfig } from 'axios';
import { FetchResponse } from '../interfaces';

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

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id)
      .then((res) => res.data);
  };

  patch = (id: number | string, data: Partial<T>) => {
    return axiosInstance
      .patch<T>(this.endpoint + '/' + id, data)
      .then((res) => res.data);
  };

  delete = (id: number | string) => {
    return axiosInstance
      .delete(this.endpoint + '/' + id)
      .then((res) => res.data);
  };
}

export default APIClient;
