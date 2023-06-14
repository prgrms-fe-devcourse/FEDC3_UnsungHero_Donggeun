import styled from 'styled-components';
import { IsJsonString } from './isJsonString';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToken } from '../contexts/TokenProvider';
import { Avatar } from '../common';
import { getElapsedTime } from './getElapsedTime';
import { getHighlightingContent } from './getHighlightingContent';
import { FaRegCommentAlt } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

interface IMobile {
  isMobileSearching: boolean;
  pathName: string;
}
interface Ilikes {
  _id: string;
}

interface IComments {
  _id: string;
}
interface Iauthor {
  fullName: string;
  username: string;
  image: string | undefined;
}

interface IChannel {
  _id: string;
  name: string;
}

interface IfilteredPostsInfo {
  title: string;
  _id: string;
  author: Iauthor;
  likes: Ilikes[];
  createdAt: string;
  comments: IComments[];
  channel: IChannel;
}
interface IpostListProps {
  filteredPostsInfo: IfilteredPostsInfo[];
  selectedSearchOption: string;
  inputSearchValue: string;
  currentChannelId: string | undefined;
  channelName?: string;
  isMobileSearching: boolean;
}

const PostList = ({
  filteredPostsInfo,
  selectedSearchOption,
  inputSearchValue,
  currentChannelId,
  channelName,
  isMobileSearching,
}: IpostListProps) => {
  const navigatePost = useNavigate();
  const pathName = useLocation().pathname;

  const selectPostsChannelTitle = (channelId: string | undefined) => {
    let PostsChannelTitle = '';
    if (!channelId || channelId === 'undefined') PostsChannelTitle = '전체';
    else PostsChannelTitle = channelName as string;

    return PostsChannelTitle;
  };

  const tokenObject = useToken();
  const token = tokenObject?.token;

  return (
    <WholeWrapper isMobileSearching={isMobileSearching} pathName={pathName}>
      <div className='postListTitle'>📃{selectPostsChannelTitle(currentChannelId)}</div>
      <PostListWrapper>
        {filteredPostsInfo.map((postInfo) => {
          const { title, _id, likes, createdAt, comments, channel } = postInfo;
          const { fullName, image } = postInfo.author; //fullName이 아니라 userName이 닉네임인 경우 변경해야함
          const postTitle = IsJsonString(title) ? JSON.parse(title).title : title;
          const postContent = IsJsonString(title) ? JSON.parse(title).content : ' ';

          return (
            <PostWrapper
              key={_id}
              onClick={() => {
                if (token) {
                  navigatePost(`/post/${_id}`);
                } else {
                  navigatePost('/login');
                }
              }}
            >
              <PostTopWrapper>
                <Avatar src={image} width={60} height={60} />
                <div className='postTitleContentContainer'>
                  <div className='postTitleDotContainer'>
                    <div className='postTitle'>
                      {selectedSearchOption === '제목' || selectedSearchOption === '제목+내용'
                        ? getHighlightingContent(postTitle, inputSearchValue)
                        : postTitle}
                    </div>
                  </div>
                  <div className='postContent'>
                    {selectedSearchOption === '제목+내용'
                      ? getHighlightingContent(postContent, inputSearchValue)
                      : postContent}
                  </div>
                </div>
              </PostTopWrapper>
              <PostMiddleWrapper>
                <div className='postAuthor'>
                  {selectedSearchOption === '작성자'
                    ? getHighlightingContent(fullName, inputSearchValue)
                    : fullName}
                </div>
                <div className='includedChannel'>{channel?.name}</div>
              </PostMiddleWrapper>
              <PostBottomWrapper>
                <div className='likesCommentContainer'>
                  <FiHeart fontSize={19} className='likeIcon' />
                  <div className='iconNumber'>{likes.length}</div>
                  <FaRegCommentAlt />
                  <div className='iconNumber'>{comments.length}</div>
                </div>
                <div className='createdAt'>{getElapsedTime(createdAt)}</div>
              </PostBottomWrapper>
            </PostWrapper>
          );
        })}
      </PostListWrapper>
    </WholeWrapper>
  );
};
export default PostList;

const WholeWrapper = styled.div<IMobile>`
  display: ${(props) => `${props.pathName.includes('search') && props.isMobileSearching ? 'none' : 'flex'}`};
  flex-direction: column;
  margin-right: 2.5rem;

  .postListTitle {
    font-family: 'BMHANNAPro';
    font-size: 1.5rem;
    font-weight: bold;
    width: 725px;
    height: 3.125rem;
    padding: 0.9375rem 0 0 1.25rem;
    border-top-left-radius: 0.3125rem;
    border-top-right-radius: 0.3125rem;
    background-color: ${({ theme }) => theme.colors.primary};
    z-index: 10;
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      width: 100vw;
    }
  }
`;

const PostListWrapper = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-top: 0rem;
  width: 45.3125rem;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 100vw;
  }
`;

const PostWrapper = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 0.3125rem;
  padding: 1rem 1.25rem;
  gap: 0rem;
  cursor: pointer;
  height: 12.5rem;
  margin-bottom: 0.9375rem;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  &:hover {
    .postTitle {
      text-decoration: underline;
    }
  }
  &:first-child {
    border-radius: 0px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-bottom: 0px;
    border-radius: 0px;
    border-top: solid 1px ${({ theme }) => theme.colors.lightGray};
    box-shadow: none;
  }
`;

const PostTopWrapper = styled.div`
  display: flex;

  .postTitleContentContainer {
    width: 100%;

    .postTitleDotContainer {
      display: flex;

      .postTitle {
        margin: 0.3125rem 0.625rem 0.625rem 1rem;
        font-size: ${({ theme }) => theme.fontSize.large};
        font-weight: 500;
        width: 35.625rem;
        height: 23px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        @media (max-width: ${({ theme }) => theme.media.mobile}) {
          width: 65vw;
        }
      }
    }
  }

  .postContent {
    margin: 0.5rem 0.5rem 0.5rem 1rem;
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.colors.gray};
    width: 36.25rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      width: 70vw;
    }
  }
`;

const PostMiddleWrapper = styled.div`
  width: 100%;
  height: 4.375rem;
  margin-bottom: 0.625rem;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.contentLine};
  font-size: 0.9375rem;

  .postAuthor {
    display: flex;
    justify-content: center;
    white-space: nowrap;
    font-weight: 500;
    margin-bottom: 1.25rem;
    height: 1.125rem;
    width: 3.75rem;
    max-width: 97px;
    font-size: 14px;
  }

  .includedChannel {
    display: flex;
    justify-content: center;
    width: 4.0625rem;
    margin: 0.625rem 0 1.5625rem 0rem;
    font-size: 0.75rem;
    line-height: 1.1875rem;
    font-weight: 900;
    padding: 0.25rem 0.375rem;
    border-radius: 0.375rem;
    color: rgb(48, 176, 153);
    background: rgb(245, 245, 245);
  }
`;

const PostBottomWrapper = styled.div`
  display: flex;
  flex-direction: row;

  .likesCommentContainer {
    display: flex;
    align-items: center;
    width: 87%;
    color: ${({ theme }) => theme.colors.lightGray};

    .likeIcon {
      margin-bottom: 0.125rem;
    }
    .iconNumber {
      width: 1.25rem;
      margin-left: 0.1875rem;
      margin-top: 0.0625rem;
    }
  }

  .createdAt {
    display: flex;
    justify-content: end;
    width: 100%;
    margin-left: auto;
    color: ${({ theme }) => theme.colors.lightGray};

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      display: flex;
      justify-content: flex-end;
      width: 100vw;
    }
  }
`;
