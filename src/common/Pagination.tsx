import styled from 'styled-components';
import { useEffect } from 'react';

interface IProps {
  total: number;
  limit: number;
  page: number;
  setPage: (value: number) => void;
  currentChannelId?: string;
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
    <PaginationWrapper>
      <Wrapper>
        <Button onClick={() => setPage(1)}>처음</Button>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          {'<'}
        </Button>
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
            <PageButton key={i + 1} onClick={() => setPage(i + 1)} page={page} i={i}>
              {i + 1}
            </PageButton>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          {'>'}
        </Button>
        <Button onClick={() => setPage(totalPages)}>마지막</Button>
      </Wrapper>
    </PaginationWrapper>
  );
};

export default Pagination;

const PageButton = styled.button<IButtonStyle>`
  cursor: pointer;
  background-color: ${({ page, i, theme }) => (page === i + 1 ? `${theme.colors.primary}80` : 'transparent')};
  border-radius: 5px;
  padding: 0.313rem 0.5rem;
  margin: 0 0.313rem;
  border: none;
  &:hover {
    background-color: ${({ page, i }) => page !== i + 1 && '#e2e2e2'};
  }
`;

const Button = styled.button`
  cursor: pointer;
  font-weight: bold;
  background-color: transparent;
  border-radius: 5px;
  padding: 0 0.313rem;
  margin: 0 0.313rem;
  border: none;
  &:hover {
    background-color: ${({ disabled }) => !disabled && '#e2e2e2'};
  }
`;
const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  padding: 1.25rem 0;
  left: 50%;
  transform: translateX(-50%);
`;

const PaginationWrapper = styled.div`
  height: 4.375rem;
`;
