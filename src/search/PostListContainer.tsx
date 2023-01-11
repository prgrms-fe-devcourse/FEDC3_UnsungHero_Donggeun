import PostList from './PostList';
import Pagination from './Pagination';
import { useState } from 'react';

interface Ilikes {
  _id: string;
}
interface Iauthor {
  fullName: string;
  username: string;
}

interface IpostsInfo {
  title: string;
  _id: string;
  author: Iauthor;
  likes: Ilikes[];
  createdAt: string;
}
interface IpostListContainerProps {
  postsInfo: IpostsInfo[];
  selectedSearchOption: string;
  inputSearchValue: string;
}

const PostListContainer = ({
  postsInfo,
  selectedSearchOption,
  inputSearchValue,
}: IpostListContainerProps) => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  const dividePosts = (posts: any) => {
    const result = posts.slice(offset, offset + limit);
    return result;
  };

  const filterPosts = () => {
    const filteredPosts = postsInfo.filter((postInfo) => {
      const { title } = postInfo;
      const { fullName } = postInfo.author; //fullName이 아니라 userName이 닉네임인 경우 변경해야함

      if (selectedSearchOption === '제목') {
        return JSON.parse(title).title.includes(inputSearchValue);
      } else if (selectedSearchOption === '제목+내용') {
        return (
          JSON.parse(title).title.includes(inputSearchValue) ||
          JSON.parse(title).content.includes(inputSearchValue)
        );
      } else if (selectedSearchOption === '작성자') {
        return fullName.includes(inputSearchValue);
      }
    });
    return filteredPosts;
  };

  return (
    <>
      <PostList
        filteredPostsInfo={dividePosts(filterPosts())}
        selectedSearchOption={selectedSearchOption}
        inputSearchValue={inputSearchValue}
      />
      <Pagination limit={limit} page={page} totalPosts={filterPosts().length} setPage={setPage} />
    </>
  );
};

export default PostListContainer;
