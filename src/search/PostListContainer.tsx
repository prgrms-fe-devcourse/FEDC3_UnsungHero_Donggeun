import PostList from './PostList';
import { useState, useEffect } from 'react';
import { IsJsonString } from './isJsonString';
import styled from 'styled-components';
import { Pagination } from '../common';
import { useNavigate } from 'react-router-dom';
import { IChannel } from '../types/channel';
import { useToken } from '../contexts/TokenProvider';
import { IComment } from '../types/comment';

interface IInnerWidth {
  innerWidth: number;
}
interface Ilikes {
  _id: string;
}
interface Iauthor {
  fullName: string;
  username: string;
  image: string;
}

interface IpostsInfo {
  title: string;
  _id: string;
  author: Iauthor;
  likes: Ilikes[];
  createdAt: string;
  channel: IChannel;
  comments: IComment[];
}

interface IpostListContainerProps {
  postsInfo: IpostsInfo[];
  selectedSearchOption: string;
  inputSearchValue: string;
  currentChannelId: string | undefined;
  isMobileSearching: boolean;
}

const PostListContainer = ({
  postsInfo,
  selectedSearchOption,
  inputSearchValue,
  currentChannelId,
  isMobileSearching,
}: IpostListContainerProps) => {
  const [page, setPage] = useState(1);
  const [checkedSorting, setCheckedSorting] = useState(true);
  const limit = 6;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  const innerWidth = window.innerWidth;

  useEffect(() => {
    setCheckedSorting(true);
  }, [currentChannelId]);

  const dividePosts = (posts: IpostsInfo[]) => {
    const result = posts.slice(offset, offset + limit);
    return result;
  };

  const filterPosts = () => {
    const filteredPosts = postsInfo.filter((postInfo) => {
      // 테스트 채널 제외하기.
      if (postInfo.channel.name !== '테스트') {
        const { title } = postInfo;
        const { fullName } = postInfo.author; //fullName이 아니라 userName이 닉네임인 경우 변경해야함
        const postTitle = IsJsonString(title) ? JSON.parse(title).title : title;
        const postContent = IsJsonString(title) ? JSON.parse(title).content : '';
        const searchValue = inputSearchValue.trim();

        if (selectedSearchOption === '제목') {
          return postTitle.includes(searchValue);
        } else if (selectedSearchOption === '제목+내용') {
          return postTitle.includes(searchValue) || postContent.includes(searchValue);
        } else if (selectedSearchOption === '작성자') {
          return fullName.includes(searchValue);
        } else {
          return postsInfo;
        }
      }
    });

    if (!checkedSorting) {
      filteredPosts.sort((a, b) => {
        if (a.likes.length > b.likes.length) {
          return -1;
        } else if (a.likes.length < b.likes.length) {
          return 1;
        } else if (a.comments.length > b.comments.length) {
          return -1;
        } else if (a.comments.length < b.comments.length) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return filteredPosts;
  };

  const handleOnClickRecent = () => setCheckedSorting(!checkedSorting);

  const handleOnClickSympathy = () => setCheckedSorting(!checkedSorting);

  const channelName = postsInfo[0]?.channel.name;
  const tokenObject = useToken();
  const token = tokenObject?.token;

  return (
    <>
      <ButtonContainer>
        <div className='recentLikesButtonContainer'>
          <button onClick={handleOnClickRecent} disabled={checkedSorting}>
            최신순
          </button>
          <button onClick={handleOnClickSympathy} disabled={!checkedSorting}>
            공감순
          </button>
        </div>
        {currentChannelId && token ? (
          <button className='writePostButton' onClick={() => navigate(`/post/create/${currentChannelId}`)}>
            글 작성하기
          </button>
        ) : null}
      </ButtonContainer>
      <PostList
        filteredPostsInfo={innerWidth > 600 ? dividePosts(filterPosts()) : filterPosts()}
        selectedSearchOption={selectedSearchOption}
        inputSearchValue={inputSearchValue}
        currentChannelId={currentChannelId}
        channelName={channelName}
        isMobileSearching={isMobileSearching}
      />
      <PaginationContainer innerWidth={innerWidth}>
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
  width: 100%;

  .recentLikesButtonContainer {
    display: flex;
    justify-content: flex-end;

    button {
      width: 5rem;
      margin: 0.625rem 0.125rem 1rem 0rem;
      font-size: ${({ theme }) => theme.fontSize.medium};
      line-height: 1.1875rem;
      font-weight: 900;
      padding: 0.25rem 0.5rem;
      border: solid 1px rgb(245, 245, 245);
      border-radius: 0.375rem;
      color: rgb(48, 176, 153);
      background: rgb(245, 245, 245);
      cursor: pointer;
      box-shadow: 0px 2px 1px ${({ theme }) => theme.colors.shadow};
      transition: all 0.2s ease;

      &:disabled {
        background: rgb(48, 176, 153);
        color: white;
        box-shadow: none;
      }
    }
  }
  .writePostButton {
    width: 6.625rem;
    margin: 0.625rem 0 1rem 0rem;
    font-size: 1rem;
    line-height: 1.1875rem;
    font-weight: 900;
    padding: 0.25rem 0.5rem;
    border: solid 1px rgb(245, 245, 245);
    border-radius: 0.375rem;
    color: rgb(48, 176, 153);
    background: rgb(245, 245, 245);
    cursor: pointer;
    box-shadow: 0px 2px 1px ${({ theme }) => theme.colors.shadow};

    &:hover {
      background: rgb(48, 176, 153);
      color: white;
      box-shadow: none;
      transition: all 0.2s ease;
    }
  }
`;

const PaginationContainer = styled.div<IInnerWidth>`
  position: relative;
  display: ${(props) => {
    return `${props.innerWidth > 600 ? 'block' : 'none'}`;
  }};
`;
