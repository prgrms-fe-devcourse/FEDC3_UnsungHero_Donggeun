import { useState, useCallback, useEffect } from 'react';
import useInfiniteSendQuery from './useInfiniteSendQuery';

interface IInterSectionObserver {
  root: null;
  rootMargin: string;
  threshold: number | number[];
}

export const useIntersectionObserver = (url: string, loader: React.RefObject<HTMLElement>) => {
  const [page, setPage] = useState(0);

  const { list, loading, error, sendQuery } = useInfiniteSendQuery(page, url);

  const limit = 7;

  useEffect(() => {
    if (list.length !== (page + 1) * limit) sendQuery();
  }, [page]);

  const handleObserver: IntersectionObserverCallback = useCallback(([{ isIntersecting }]) => {
    if (!loading.current && isIntersecting) setPage((prev) => prev + 1);
  }, []);

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
  }, [handleObserver]);

  return { page, list, loading, error, sendQuery };
};
