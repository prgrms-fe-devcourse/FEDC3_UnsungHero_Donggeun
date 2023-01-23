import { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Spinner from './common/Spinner';
import axios from 'axios';
import Loading from './api/Loading';

const limit = 5;

function InfiniteScroll() {
  const [page, setPage] = useState(0);
  const loader = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState<object[]>([]);

  const sendQuery = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(
        `https://kdt.frontend.3rd.programmers.co.kr:5006/posts?offset=${page * limit}&limit=${limit}`
      );
      setList((prev) => [...prev, ...res.data]);
      setLoading(false);
    } catch (err: any) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [page]);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  console.log(list);
  return (
    <div className='App'>
      <div>
        {list.map((item: any, i) => (
          <Item key={i}>{item.title}</Item>
        ))}
      </div>
      {loading && <Spinner />}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </div>
  );
}

export default InfiniteScroll;

const Item = styled.div`
  height: 9.375rem;
`;
