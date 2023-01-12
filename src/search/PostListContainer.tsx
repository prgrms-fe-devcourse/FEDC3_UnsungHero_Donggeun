import PostList from './PostList';
import Pagination from './Pagination';
import { useState } from 'react';
import { IsJsonString } from './isJsonString';

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
  const [checkedSorting, setCheckedSorting] = useState(true);
  const limit = 10;
  const offset = (page - 1) * limit;

  const dividePosts = (posts: any) => {
    const result = posts.slice(offset, offset + limit);
    return result;
  };

  const filterPosts = () => {
    const filteredPosts = postsInfo.filter((postInfo) => {
      const { title } = postInfo;
      const { fullName } = postInfo.author; //fullName이 아니라 userName이 닉네임인 경우 변경해야함
      const postTitle = IsJsonString(title) ? JSON.parse(title).title : title;
      const postContent = IsJsonString(title) ? JSON.parse(title).content : '';

      if (selectedSearchOption === '제목') {
        return postTitle.includes(inputSearchValue);
      } else if (selectedSearchOption === '제목+내용') {
        return postTitle.includes(inputSearchValue) || postContent.includes(inputSearchValue);
      } else if (selectedSearchOption === '작성자') {
        return fullName.includes(inputSearchValue);
      } else {
        return postsInfo;
      }
    });

    if (!checkedSorting) {
      filteredPosts.sort((a, b) => {
        if (a.likes.length > b.likes.length) {
          return -1;
        } else if (a.likes.length < b.likes.length) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return filteredPosts;
  };

  const handleClickRecent = () => {
    setCheckedSorting(!checkedSorting);
  };

  const handleClickSympathy = () => {
    setCheckedSorting(!checkedSorting);
  };

  return (
    <>
      <div>
        <button onClick={handleClickRecent} disabled={checkedSorting}>
          최신순
        </button>
        <button onClick={handleClickSympathy} disabled={!checkedSorting}>
          공감순
        </button>
      </div>
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
