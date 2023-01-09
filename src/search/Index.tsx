import SearchBox from './SearchBox';
import PostListContainer from './PostListContainer';
import { FunctionComponent, useState } from 'react';
import axios from 'axios';

const API_END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

interface SearchProps {
  _id: string;
}

const Search: FunctionComponent<SearchProps> = ({ _id }) => {
  const [postTitles, setPostTitles] = useState([]); //PostListContainer에 넘겨 줄 데이터들
  const [selectedSearchValue, setSelectedSearchValue] = useState('');
  const [inputSearchValue, setInputSearchValue] = useState('');

  const getPostsList = async () => {
    axios.get(`${API_END_POINT}/posts/channel/63bbe845400746566c234d41`).then((response) => {
      const { data } = response;
      setPostTitles(data);
    });
  };

  return (
    <>
      <SearchBox
        setSelectedSearchValue={setSelectedSearchValue}
        setInputSearchValue={setInputSearchValue}
        getPostsList={getPostsList}
      />
      <PostListContainer
        postTitles={postTitles}
        selectedSearchValue={selectedSearchValue}
        inputSearchValue={inputSearchValue}
      />
    </>
  );
};
export default Search;

// interface IPost {
//   title: string;
//   comment: string;
// }

// interface IChannel {
//   authRequired: boolean;
//   post: string[];
// }

// interface IPostList {
//   like: IUser[];
//   comments: IComment[];
//   title: IPost;
//   channel: IChannel;
// }
