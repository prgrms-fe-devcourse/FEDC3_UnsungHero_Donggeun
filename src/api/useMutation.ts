/* eslint-disable @typescript-eslint/ban-types */
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { IRequest } from '../types/request';
import { IToken } from '../types/token';
import { useToken } from '../contexts/TokenProvider';

const useMutation = () => {
  const [error, setError] = useState<Error>();
  const tokenContextObj: IToken | null = useToken();

  const mutate = async ({ url, method, data }: IRequest) => {
    const config = {
      headers: {
        Authorization: `bearer ${tokenContextObj?.token}`,
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
      data,
    };

    try {
      let response;

      if (method === 'delete') {
        response = await axios[method](url, config);
      } else {
        response = await axios[method](url, data, config);
      }

      return response.data;
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

  return { mutate };
};

export default useMutation;
