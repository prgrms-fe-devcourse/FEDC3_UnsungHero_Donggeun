import styled from 'styled-components';
import { useEffect } from 'react';

interface IpaginationProps {
  limit: number;
  page: number;
  totalPosts: number;
  setPage: (value: number) => void;
  presentChannelId: string | undefined;
}

interface IButtonStyle {
  page: number;
  i: number;
}

const Pagination = ({ totalPosts, limit, page, setPage, presentChannelId }: IpaginationProps) => {
  const totalPages = Math.ceil(totalPosts / limit);

  useEffect(() => {
    setPage(1);
  }, [presentChannelId]);

  return (
    <>
      <button onClick={() => setPage(1)}>처음</button>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        이전
      </button>
      {Array.from(new Array(totalPages), (_, i) => i)
        .filter((i) => {
          if (page < 4) {
            return i < 5;
          } else if (page > totalPages - 3) {
            return i >= totalPages - 5;
          }
          return i >= page - 2 && i <= page + 2;
        })
        .map((i) => (
          <Button key={i + 1} onClick={() => setPage(i + 1)} page={page} i={i}>
            {i + 1}
          </Button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        다음
      </button>
      <button onClick={() => setPage(totalPages)}>마지막</button>
    </>
  );
};

export default Pagination;

const Button = styled.button<IButtonStyle>`
  background-color: ${({ page, i }) => (page === i + 1 ? 'white' : null)};
  cursor: pointer;
`;
