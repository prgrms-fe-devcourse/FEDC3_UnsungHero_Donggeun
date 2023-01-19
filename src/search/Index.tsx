import SearchBox from './SearchBox';
import PostListContainer from './PostListContainer';
import MostLikesPosts from './MostLikesPosts';
import { useState, useEffect } from 'react';
import ErrorBoundary from '../api/ErrorBoundary';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../api/Loading';
import { useQuery } from 'react-query';
import { END_POINT } from '../api/apiAddress';

const Search = () => {
  const [selectedSearchOption, setSelectedSearchOption] = useState('');
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [specificPostData, setSpecificPostData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { channelId } = useParams();

  // 캐싱 안되게끔.
  const { data: totalPostData, isLoading: totalPostDataLoading } = useQuery('totalPostData', async () => {
    return axios.get(`${END_POINT}/posts`).then(({ data }) => data);
  });

  const getPostsList = async () => {
    setIsLoading(true);
    axios.get(`${END_POINT}/posts/channel/${channelId}`).then((response) => {
      const { data } = response;
      setSpecificPostData(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    channelId && getPostsList();
  }, [channelId]);

  const loading = channelId ? isLoading : totalPostDataLoading;
  const postsInfo = channelId ? specificPostData : totalPostData;

  return (
    <ErrorBoundary>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MostLikesPosts postsInfo={postsInfo} currentChannelId={channelId} />
          <SearchBox
            setSelectedSearchOption={setSelectedSearchOption}
            setInputSearchValue={setInputSearchValue}
            currentChannelId={channelId}
          />
          <PostListContainer
            postsInfo={postsInfo}
            selectedSearchOption={selectedSearchOption}
            inputSearchValue={inputSearchValue}
            currentChannelId={channelId}
          />
        </>
      )}
    </ErrorBoundary>
  );
};
export default Search;
