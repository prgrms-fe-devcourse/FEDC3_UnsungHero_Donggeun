/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

interface IAxiosProps {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  config?: AxiosRequestConfig;
}

interface IResponse<T> {
  data?: T;
}

const useAxios = <T>({ url, method = 'get', config }: IAxiosProps): IResponse<T> => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  const fetchData = async () => {
    try {
      const response = await axios[method](url, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('token')}`,
          'Content-Type': config?.data instanceof FormData ? 'multipart/form-data' : 'application/json',
        },
        ...config,
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
