import { FunctionComponent, useState, useCallback, useRef, useReducer } from 'react';
import SearchBox from './SearchBox';
import { DUMMY_DATA } from './DUMMYDATA';

type IndexProps = {
  _id: string;
};

const Index: FunctionComponent<IndexProps> = ({ _id }) => {
  const [posts, setPosts] = useState(DUMMY_DATA); //PostListContainer에 넘겨 줄 데이터들
  const [selectedValue, setSelectedValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const searchPostList = (selectedValue: string, inputValue: string): void => {
    setPosts(DUMMY_DATA); // 채널 _id를 통해 해당 채널 게시글 목록을 불러와 담을 예정
    setSelectedValue(selectedValue); // 제목 | 제목+내용 | 작성자 값이 들어감
    setInputValue(inputValue); // 검색창에 입력된 값이 들어감
  };

  return (
    <>
      <SearchBox searchPostList={searchPostList} />
    </>
  );
};
export default Index;
