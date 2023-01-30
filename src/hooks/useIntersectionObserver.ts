import { useState, useCallback, useEffect } from 'react';
import useInfiniteSendQuery from './useInfiniteSendQuery';
import { INFINITE_SCROLL_LIMIT } from '../api/constValue';

interface InterSectionObserver {
  root: null;
  rootMargin: string;
  threshold: number | number[];
}

interface InterSectionObserverData {
  url: string;
  loader: React.RefObject<HTMLElement>;
}

export const useIntersectionObserver = ({ url, loader }: InterSectionObserverData) => {
  const [page, setPage] = useState(0);
  const { list, loading, error, sendQuery } = useInfiniteSendQuery({ page, url });

  useEffect(() => {
    if (list.length === (page + 1) * INFINITE_SCROLL_LIMIT) return;

    sendQuery();
  }, [page]);

  const handleObserver: IntersectionObserverCallback = useCallback(([{ isIntersecting }]) => {
    if (!loading.current && isIntersecting) setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!loader.current) return;

    const option: InterSectionObserver = {
      root: null,
      rootMargin: '10px',
      threshold: 0,
    };
    const observer: IntersectionObserver = new IntersectionObserver(handleObserver, option);
    observer.observe(loader.current);

    return () => {
      loader.current && observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  return { page, list, loading, error, sendQuery };
};
