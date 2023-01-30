import { useCallback, useState, useRef } from 'react';
import axios from 'axios';
import { END_POINT } from '../api/apiAddress';
import request from 'axios';
import { useToken } from '../contexts/TokenProvider';
import { IToken } from '../types/token';
import { IPost } from '../types/post';
import { INFINITE_SCROLL_LIMIT } from '../api/constValue';
import { INotification } from '../types/notification';

interface TodoErrorResponse {
  error: string;
}

interface SendQueryData {
  page: number;
  url: string;
}

const useInfiniteSendQuery = ({ page, url }: SendQueryData) => {
  const tokenContextObj: IToken | null = useToken();

  const [error, setError] = useState(false);
  const [list, setList] = useState<IPost[] | INotification[]>([]);
  const loading = useRef(true);

  const sendQuery = useCallback(
    async (specificData?: INotification[]) => {
      try {
        loading.current = true;
        setError(false);

        if (specificData) {
          setList(specificData);
          loading.current = false;
          return;
        }

        const res = await axios.get(
          `${END_POINT}${url}?offset=${page * INFINITE_SCROLL_LIMIT}&limit=${INFINITE_SCROLL_LIMIT}`,
          {
            headers: { Authorization: `bearer ${tokenContextObj?.token}` },
          }
        );
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
