import SearchBox from './SearchBox';
import PostListContainer from './PostListContainer';
import { FunctionComponent, useState } from 'react';
import axios from 'axios';

const API_END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

interface ISearchProps {
  channelId: string;
}

const Search: FunctionComponent<ISearchProps> = ({ channelId }) => {
  const [postsInfo, setPostsInfo] = useState([]); //PostListContainer에 넘겨 줄 데이터들
  const [selectedSearchOption, setSelectedSearchOption] = useState('');
  const [inputSearchValue, setInputSearchValue] = useState('');

  const getPostsList = async () => {
    axios.get(`${API_END_POINT}/posts/channel/${channelId}/?offset=1&limit=9`).then((response) => {
      const { data } = response;
      setPostsInfo(data);
    });
  };

  return (
    <>
      <SearchBox
        setSelectedSearchOption={setSelectedSearchOption}
        setInputSearchValue={setInputSearchValue}
        getPostsList={getPostsList}
      />
      <PostListContainer
        postsInfo={postsInfo}
        selectedSearchOption={selectedSearchOption}
        inputSearchValue={inputSearchValue}
      />
    </>
  );
};
export default Search;
