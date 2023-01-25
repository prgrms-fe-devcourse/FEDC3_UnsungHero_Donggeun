import SearchBox from './SearchBox';
import PostListContainer from './PostListContainer';
import MostLikesPosts from './MostLikesPosts';
import { useState, useEffect } from 'react';
import ErrorBoundary from '../api/ErrorBoundary';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import Loading from '../api/Loading';
import { useQuery } from 'react-query';
import { END_POINT } from '../api/apiAddress';

const Search = () => {
  const [selectedSearchOption, setSelectedSearchOption] = useState('');
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [specificPostData, setSpecificPostData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobileSearching, setIsMobileSearching] = useState<boolean>(true);
  const { channelId } = useParams();
  const pathname = useLocation().pathname;
  // 캐싱 안되게끔.
  const { data: totalPostData, isLoading: totalPostDataLoading } = useQuery(
    'totalPostData',
    async () => {
      return axios.get(`${END_POINT}/posts`).then(({ data }) => data);
    },
    {
      refetchOnMount: true,
      staleTime: 2000,
    }
  );

  const getSpecificPostsList = async () => {
    setIsLoading(true);
    if (channelId !== 'undefined') {
      axios.get(`${END_POINT}/posts/channel/${channelId}`).then((response) => {
        const { data } = response;
        setSpecificPostData(data);
        setInputSearchValue('');
        setSelectedSearchOption('제목');
        setIsLoading(false);
        setIsMobileSearching(true);
      });
    } else {
      axios.get(`${END_POINT}/posts`).then((response) => {
        const { data } = response;
        setSpecificPostData(data);
        setInputSearchValue('');
        setSelectedSearchOption('제목');
        setIsLoading(false);
        setIsMobileSearching(true);
      });
    }
  };

  useEffect(() => {
    channelId && getSpecificPostsList();
  }, [channelId, pathname]);

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
            setIsMobileSearching={setIsMobileSearching}
          />
          <PostListContainer
            postsInfo={postsInfo}
            selectedSearchOption={selectedSearchOption}
            inputSearchValue={inputSearchValue}
            currentChannelId={channelId}
            isMobileSearching={isMobileSearching}
          />
        </>
      )}
    </ErrorBoundary>
  );
};
export default Search;
