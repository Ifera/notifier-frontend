import { AxiosError } from 'axios';

export const parseError = (error: Error): string => {
  if (error instanceof AxiosError) {
    return error.response?.data || error.message;
  }

  return error.message;
};
