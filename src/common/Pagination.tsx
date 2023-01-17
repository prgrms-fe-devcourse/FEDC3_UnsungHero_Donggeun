import styled from 'styled-components';
import { useEffect } from 'react';

interface IProps {
  total: number;
  limit: number;
  page: number;
  setPage: (value: number) => void;
  currentChannelId?: string | undefined;
}

interface IButtonStyle {
  page: number;
  i: number;
}

const Pagination = ({ total = 0, limit, page, setPage, currentChannelId }: IProps) => {
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    setPage(1);
  }, [currentChannelId]);

  return (
    <>
      <button onClick={() => setPage(1)}>처음</button>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        이전
      </button>
      {Array.from(new Array(totalPages), (_, i) => i)
        .filter((i) => {
          if (page < 3) {
            return i < 5;
          } else if (page > totalPages - 3) {
            return i >= totalPages - 5;
          }
          return i >= page - 3 && i <= page + 1;
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
  &[currentPage] {
    border: 2px solid red;
  }
  background-color: ${({ page, i }) => (page === i + 1 ? 'red' : null)};
`;
