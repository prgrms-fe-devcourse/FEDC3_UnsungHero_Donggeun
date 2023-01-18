import PostList from './PostList';
import { useState, useEffect } from 'react';
import { IsJsonString } from './isJsonString';
import styled from 'styled-components';
import { Pagination } from '../common';
import { Navigate, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
        <div className='recentLikesButtonContainer'>
          <button onClick={handleClickRecent} disabled={checkedSorting}>
            최신순
          </button>
          <button onClick={handleClickSympathy} disabled={!checkedSorting}>
            공감순
          </button>
        </div>
        {currentChannelId ? (
          <button className='writePostButton' onClick={() => navigate(`/post/create/${currentChannelId}`)}>
            글 작성하기
          </button>
        ) : null}
      </ButtonContainer>
      <PostList
        filteredPostsInfo={dividePosts(filterPosts())}
        selectedSearchOption={selectedSearchOption}
        inputSearchValue={inputSearchValue}
        currentChannelId={currentChannelId}
      />
      <PaginationContainer>
        <Pagination
          limit={limit}
          page={page}
          total={filterPosts().length}
          setPage={setPage}
          currentChannelId={currentChannelId}
        />
      </PaginationContainer>
    </>
  );
};

export default PostListContainer;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 45.3125rem;
  margin: 0 0 0.625rem 0rem;

  .recentLikesButtonContainer {
    display: flex;
    justify-content: flex-end;

    button {
      width: 5rem;
      margin: 0.625rem 0 1.5625rem 0rem;
      font-size: 1rem;
      line-height: 1.1875rem;
      font-weight: 900;
      padding: 0.25rem 0.5rem;
      border: solid 1px rgb(245, 245, 245);
      border-radius: 0.375rem;
      color: rgb(48, 176, 153);
      background: rgb(245, 245, 245);
      cursor: pointer;
      box-shadow: 0 1.4px 2px rgba(0, 0, 0, 0.6);

      &:disabled {
        background: rgb(48, 176, 153);
        color: white;
        box-shadow: none;
      }
    }
  }

  .writePostButton {
    width: 6rem;
    margin: 0.625rem 0 1.5625rem 0rem;
    font-size: 1rem;
    line-height: 1.1875rem;
    font-weight: 900;
    padding: 0.25rem 0.5rem;
    border: solid 1px rgb(245, 245, 245);
    border-radius: 0.375rem;
    color: rgb(48, 176, 153);
    background: rgb(245, 245, 245);
    cursor: pointer;
    box-shadow: 0 1.4px 2px rgba(0, 0, 0, 0.6);

    &:hover {
      background: rgb(48, 176, 153);
      color: white;
      box-shadow: none;
    }
  }
`;

const PaginationContainer = styled.div`
  position: relative;
`;
