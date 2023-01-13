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
  const [currentChannelId, setCurrentChannelId] = useState<string | undefined>('');
  const { channelId } = useParams();

  if (channelId !== currentChannelId) {
    setCurrentChannelId(channelId);
  }

  useEffect(() => {
    if (currentChannelId !== undefined) {
      getPostsList();
      setSelectedSearchOption('');
      setInputSearchValue('');
    }
  }, [currentChannelId]);

  const getPostsList = async () => {
    axios.get(`${API_END_POINT}/posts/channel/${currentChannelId}`).then((response) => {
      const { data } = response;
      setPostsInfo(data);
    });
  };

  const getEntirePostsList = async () => {
    axios.get(`${API_END_POINT}/posts`).then((response) => {
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
        getEntirePostsList={getEntirePostsList}
        channelId={currentChannelId}
      />
      <PostListContainer
        postsInfo={postsInfo}
        selectedSearchOption={selectedSearchOption}
        inputSearchValue={inputSearchValue}
        presentChannelId={currentChannelId}
      />
    </ErrorBoundary>
  );
};
export default Search;
