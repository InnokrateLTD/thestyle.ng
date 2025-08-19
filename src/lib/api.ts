import axiosInstance from '@/lib/axiosInstance';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const apiRequest = async <TResponse, TRequest>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  data?: TRequest
): Promise<TResponse> => {
  const config: AxiosRequestConfig<TRequest> = {
    method,
    url,
    data,
  };

  const response: AxiosResponse<TResponse> = await axiosInstance(config);
  return response.data;
};
