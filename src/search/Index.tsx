import SearchBox from './SearchBox';
import PostListContainer from './PostListContainer';
import { useState, useEffect } from 'react';
import ErrorBoundary from '../api/ErrorBoundary';
import axios from 'axios';

const API_END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

interface IsearchProps {
  channelId: string | '';
}

const Search = ({ channelId }: IsearchProps) => {
  const [postsInfo, setPostsInfo] = useState([]); //PostListContainer에 넘겨 줄 데이터들
  const [selectedSearchOption, setSelectedSearchOption] = useState('');
  const [inputSearchValue, setInputSearchValue] = useState('');

  useEffect(() => {
    if (channelId === '') {
      console.log('channelId가 없는 경우 어떤 처리를 해주면 좋을지 고민중...');
    } else {
      getPostsList();
      setSelectedSearchOption('');
      setInputSearchValue('');
    }
  }, [channelId]);

  const getPostsList = async () => {
    axios.get(`${API_END_POINT}/posts/channel/${channelId}`).then((response) => {
      const { data } = response;
      setPostsInfo(data);
    });
  };

  return (
    <ErrorBoundary>
      <SearchBox
        setSelectedSearchOption={setSelectedSearchOption}
        setInputSearchValue={setInputSearchValue}
        getPostsList={getPostsList}
        channelId={channelId}
      />
      <PostListContainer
        postsInfo={postsInfo}
        selectedSearchOption={selectedSearchOption}
        inputSearchValue={inputSearchValue}
      />
    </ErrorBoundary>
  );
};
export default Search;
