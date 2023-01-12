/* eslint-disable @typescript-eslint/ban-types */
import { AxiosRequestConfig } from 'axios';

export interface IRequest {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: {} | FormData;
  config?: AxiosRequestConfig;
  params?: {};
}
