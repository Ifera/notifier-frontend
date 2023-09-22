import axios, { AxiosRequestConfig } from 'axios';
import { FetchResponse, ID } from '../interfaces';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {},
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.history.pushState(null, '', '/login');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

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
    return axiosInstance.get<FetchResponse<R>>(this.endpoint, config).then((res) => res.data);
  };

  getById = (id: ID) => {
    return axiosInstance.get<R>(this.endpoint + '/' + id).then((res) => res.data);
  };

  post = (data: Partial<S>) => {
    return axiosInstance.post<R>(this.endpoint, data).then((res) => res.data);
  };

  patch = (id: ID, data: Partial<S>) => {
    return axiosInstance.patch<R>(this.endpoint + '/' + id, data).then((res) => res.data);
  };

  delete = (id: ID) => {
    return axiosInstance.delete(this.endpoint + '/' + id).then((res) => res.data);
  };

  deleteAll = (ids: ID[]) => {
    return axiosInstance.delete(this.endpoint, { data: { ids } }).then((res) => res.data);
  };

  get = () => {
    return axiosInstance.get<R>(this.endpoint).then((res) => res.data);
  };
}

export default APIClient;
