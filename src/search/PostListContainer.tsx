import PostList from './PostList';
import Pagination from './Pagination';
import { useState, useEffect } from 'react';
import { IsJsonString } from './isJsonString';
import styled from 'styled-components';

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
  currentChannelId: string | undefined;
}

const PostListContainer = ({
  postsInfo,
  selectedSearchOption,
  inputSearchValue,
  currentChannelId,
}: IpostListContainerProps) => {
  const [page, setPage] = useState(1);
  const [checkedSorting, setCheckedSorting] = useState(true);
  const limit = 6;
  const offset = (page - 1) * limit;

  useEffect(() => {
    setCheckedSorting(true);
  }, [currentChannelId]);

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
      <ButtonContainer>
        <button onClick={handleClickRecent} disabled={checkedSorting}>
          최신순
        </button>
        <div>{' | '}</div>
        <button onClick={handleClickSympathy} disabled={!checkedSorting}>
          공감순
        </button>
      </ButtonContainer>
      <PostList
        filteredPostsInfo={dividePosts(filterPosts())}
        selectedSearchOption={selectedSearchOption}
        inputSearchValue={inputSearchValue}
        currentChannelId={currentChannelId}
      />
      <Pagination
        limit={limit}
        page={page}
        totalPosts={filterPosts().length}
        setPage={setPage}
        currentChannelId={currentChannelId}
      />
    </>
  );
};

export default PostListContainer;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 725px;
  margin: 0 0 10px 40px;

  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
    border-left: none;
    font-size: 17px;
  }
`;
