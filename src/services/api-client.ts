import axios, { AxiosRequestConfig } from 'axios';

export interface FetchResponse<T> {
  current_page: number;
  last_page: number;
  total_count: number;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  params: {},
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
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
}

export default APIClient;
