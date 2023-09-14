import axios, { AxiosRequestConfig } from 'axios';
import { FetchResponse, ID } from '../interfaces';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  params: {},
});
// S: Type of the data SENT to the API
// R: Type of the data RECEIVED from the API
class APIClient<S, R> {
  endpoint: string;
  queryKey: string[];

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.queryKey = endpoint.split('/').filter((s) => s !== '');
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<R>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: ID) => {
    return axiosInstance
      .get<R>(this.endpoint + '/' + id)
      .then((res) => res.data);
  };

  post = (data: Partial<S>) => {
    return axiosInstance.post<R>(this.endpoint, data).then((res) => res.data);
  };

  patch = (id: ID, data: Partial<S>) => {
    return axiosInstance
      .patch<R>(this.endpoint + '/' + id, data)
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

  getTags = () => {
    return axiosInstance.get<string[]>(this.endpoint).then((res) => res.data);
  };
}

export default APIClient;
