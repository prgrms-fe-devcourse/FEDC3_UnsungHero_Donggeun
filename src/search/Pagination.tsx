import { FunctionComponent } from 'react';

interface IpaginationProps {
  limit: number;
  page: number;
  totalPosts: number;
  setPage: (value: number) => void;
}

const Pagination: FunctionComponent<IpaginationProps> = ({ limit, page, totalPosts, setPage }) => {
  const pageNumbers = Math.ceil(totalPosts / limit);
  const buttonNumbers = Array(pageNumbers).fill(1);

  return (
    <div>
      {buttonNumbers.map((_, i) => {
        return (
          <button key={i + 1} onClick={() => setPage(i + 1)}>
            {i + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
