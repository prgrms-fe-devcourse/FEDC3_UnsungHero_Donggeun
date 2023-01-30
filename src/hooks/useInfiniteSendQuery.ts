import { useCallback, useState, useRef } from 'react';
import axios from 'axios';
import { END_POINT } from '../api/apiAddress';
import request from 'axios';
import { useToken } from '../contexts/TokenProvider';
import { IToken } from '../types/token';
import { IPost } from '../types/post';

interface TodoErrorResponse {
  error: string;
}

const useInfiniteSendQuery = (page: number, url?: string) => {
  const tokenContextObj: IToken | null = useToken();

  const [error, setError] = useState(false);
  // 수정(IPost)
  const [list, setList] = useState<IPost[]>([]);
  const loading = useRef(true);

  const limit = 7;

  const sendQuery = useCallback(
    async (specificData?: any) => {
      try {
        loading.current = true;
        setError(false);

        if (specificData) {
          setList(specificData);
          return;
        }

        const res = await axios.get(`${END_POINT}${url}?offset=${page * limit}&limit=${limit}`, {
          headers: { Authorization: `bearer ${tokenContextObj?.token}` },
        });
        setList((prev) => [...prev, ...res.data]);
        loading.current = false;
      } catch (err) {
        if (request.isAxiosError(err) && err.response) {
          setError(!!(err.response?.data as TodoErrorResponse).error);
        }
      }
    },
    [page]
  );

  return { list, loading, error, sendQuery };
};

export default useInfiniteSendQuery;
