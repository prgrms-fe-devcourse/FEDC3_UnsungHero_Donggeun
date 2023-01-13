import SearchBox from './SearchBox';
import PostListContainer from './PostListContainer';
import { useState, useEffect } from 'react';
import ErrorBoundary from '../api/ErrorBoundary';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const Search = () => {
  const [postsInfo, setPostsInfo] = useState([]);
  const [selectedSearchOption, setSelectedSearchOption] = useState('');
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [presentChannelId, setPresentChannelId] = useState<string | undefined>('');
  const { channelId } = useParams();

  if (presentChannelId !== channelId) {
    setPresentChannelId(channelId);
  }

  useEffect(() => {
    getPostsList();
    setSelectedSearchOption('');
    setInputSearchValue('');
  }, [presentChannelId]);

  const getPostsList = async () => {
    axios.get(`${API_END_POINT}/posts/channel/${presentChannelId}`).then((response) => {
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
        channelId={presentChannelId}
      />
      <PostListContainer
        postsInfo={postsInfo}
        selectedSearchOption={selectedSearchOption}
        inputSearchValue={inputSearchValue}
        presentChannelId={presentChannelId}
      />
    </ErrorBoundary>
  );
};
export default Search;
