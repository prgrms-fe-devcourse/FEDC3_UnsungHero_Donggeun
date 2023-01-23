import SearchBox from './SearchBox';
import PostListContainer from './PostListContainer';
import MostLikesPosts from './MostLikesPosts';
import { useState, useEffect } from 'react';
import ErrorBoundary from '../api/ErrorBoundary';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { END_POINT } from '../api/apiAddress';
import Loading from '../api/Loading';

const Search = () => {
  const [selectedSearchOption, setSelectedSearchOption] = useState('');
  const [inputSearchValue, setInputSearchValue] = useState('');
  const { channelId } = useParams();

  const { data: totalPostList } = useQuery(
    'totalPostList',
    async () => {
      return axios.get(`${END_POINT}/posts`).then(({ data }) => data);
    },
    {
      staleTime: 2000,
      suspense: true,
    }
  );

  const {
    data: specificPostList = [],
    refetch,
    isRefetching,
  } = useQuery(
    'specificPostList',
    async () => {
      if (!channelId) return;

      return axios.get(`${END_POINT}/posts/channel/${channelId}`).then(({ data }) => data);
    },
    { suspense: true, enabled: true, staleTime: 2000 }
  );

  useEffect(() => {
    channelId && refetch();
  }, [channelId]);

  const postsInfo = channelId ? specificPostList : totalPostList;

  if (isRefetching) return <Loading />;

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};
export default Search;
