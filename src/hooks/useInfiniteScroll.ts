import { useState, useCallback, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { END_POINT } from '../api/apiAddress';
import request from 'axios';

interface TodoErrorResponse {
  error: string;
}

interface IInterSectionObserver {
  root: null;
  rootMargin: string;
  threshold: number | number[];
}

const limit = 5;

export const useInfiniteScroll = (url: string, loader: React.MutableRefObject<null>) => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState<object[]>([]);

  const sendQuery = useCallback(
    async (url: string) => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(`${END_POINT}${url}?offset=${page * limit}&limit=${limit}`);
        setList((prev) => [...prev, ...res.data]);
        setLoading(false);
      } catch (err) {
        if (request.isAxiosError(err) && err.response) {
          setError(!!(err.response?.data as TodoErrorResponse).error);
        }
      }
    },
    [page]
  );

  useEffect(() => {
    sendQuery(url);
  }, [page]);

  const handleObserver: IntersectionObserverCallback = useCallback(([{ isIntersecting }]) => {
    if (isIntersecting) setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!loader.current) return;

    const option: IInterSectionObserver = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
    const observer: IntersectionObserver = new IntersectionObserver(handleObserver, option);
    observer.observe(loader.current);

    return () => {
      loader.current && observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  return { list, loading, error };
};
