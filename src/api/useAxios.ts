import axios from 'axios';
import { useEffect, useState } from 'react';
import { IRequest } from '../types/request';
import { IResponse } from '../types/response';

const useAxios = <T>({ url, params = {} }: IRequest): IResponse<T> => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api${url}`, { params });

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

  return { data, fetchData };
};

export default useAxios;
