import { FunctionComponent, useState, useCallback, useRef, useReducer } from 'react';
import SearchBox from './SearchBox';
import { DUMMY_DATA } from './DUMMYDATA';

interface SearchProps {
  _id: string;
}

const Search: FunctionComponent<SearchProps> = ({ _id }) => {
  const [posts, setPosts] = useState(DUMMY_DATA); //PostListContainer에 넘겨 줄 데이터들
  const [selectedValue2, setSelectedValue2] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  return (
    <>
      <SearchBox setSelectedValue2={setSelectedValue2} setInputValue2={setInputValue2} />
    </>
  );
};
export default Search;
