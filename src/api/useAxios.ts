/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

interface IRequest {
  url: string;
  method?: string;
  data?: {} | FormData;
  config?: AxiosRequestConfig;
  params?: {};
}

interface IResponse<T> {
  data?: T;
}

const useAxios = <T>({ url, params = {} }: IRequest): IResponse<T> => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        params,
      });

      setData(response.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e);
      }
    }
  };

  useEffect(() => {
    if (error) {
      throw new Error(error.message);
    }
  }, [error]);

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};

export default useAxios;
