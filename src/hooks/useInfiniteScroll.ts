import { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import { END_POINT } from '../api/apiAddress';
import request from 'axios';
import { IPost } from '../types/post';

interface TodoErrorResponse {
  error: string;
}

interface IInterSectionObserver {
  root: null;
  rootMargin: string;
  threshold: number | number[];
}

const limit = 7;

export const useInfiniteScroll = (url: string, loader: React.RefObject<HTMLElement>) => {
  const [page, setPage] = useState(0);
  const loading = useRef(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState<IPost[]>([]);

  const sendQuery = useCallback(
    async (url: string) => {
      try {
        loading.current = true;
        setError(false);
        const res = await axios.get(`${END_POINT}${url}?offset=${page * limit}&limit=${limit}`);
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

  useEffect(() => {
    sendQuery(url);
  }, [page]);

  const handleObserver: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (!loading.current && isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!loader.current) return;
    const option: IInterSectionObserver = {
      root: null,
      rootMargin: '10px',
      threshold: 0,
    };
    const observer: IntersectionObserver = new IntersectionObserver(handleObserver, option);
    observer.observe(loader.current);

    return () => {
      loader.current && observer.unobserve(loader.current);
    };
  }, []);

  return { list, loading, error };
};
