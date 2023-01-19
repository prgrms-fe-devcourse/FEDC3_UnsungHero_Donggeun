import styled from 'styled-components';
import { IsJsonString } from './isJsonString';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../contexts/TokenProvider';
import { Avatar } from '../common';

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
}

const Span = styled.span`
  background-color: #a6ffc6;
  border-radius: 5px;
`;

const PostList = ({
  filteredPostsInfo,
  selectedSearchOption,
  inputSearchValue,
  currentChannelId,
}: IpostListProps) => {
  const navigatePost = useNavigate();

  const selectPostsChannelTitle = (channelId: string | undefined) => {
    let PostsChannelTitle = '';
    switch (channelId) {
      case '63c775d2a989ba6d232518ce':
        PostsChannelTitle = '바둑';
        break;
      case '63c775dba989ba6d232518d3':
        PostsChannelTitle = '골프';
        break;
      case '63c775e0a989ba6d232518dc':
        PostsChannelTitle = '낚시';
        break;
      case '63c775f3a989ba6d232518ef':
        PostsChannelTitle = '육아';
        break;
      case '63c775fea989ba6d23251905':
        PostsChannelTitle = '잡담';
        break;
      default:
        PostsChannelTitle = '전체 채널';
    }
    return PostsChannelTitle;
  };

  const highlightIncludedText = (content: string, searchedValue: string) => {
    const title = content.toLowerCase();
    const searchValue = searchedValue.toLowerCase();
    if (searchValue !== '' && title.includes(searchValue)) {
      const matchText = content.split(new RegExp(`(${searchValue})`, 'gi'));
      return (
        <>
          {matchText.map((text, index) =>
            text.toLowerCase() === searchValue.toLowerCase() ? <Span key={index}>{text}</Span> : text
          )}
        </>
      );
    }
    return content;
  };

  const checkWrittenPostTime = (createdAt: string) => {
    const today = new Date();
    const timeValue = new Date(createdAt);
    const elapsedTime = Math.trunc((today.getTime() - timeValue.getTime()) / 1000);

    const seconds = 1;
    const minute = seconds * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let elapsedText = '';
    if (elapsedTime < seconds) {
      elapsedText = '방금 전';
    } else if (elapsedTime < minute) {
      elapsedText = elapsedTime + '초 전';
    } else if (elapsedTime < hour) {
      elapsedText = Math.trunc(elapsedTime / minute) + '분 전';
    } else if (elapsedTime < day) {
      elapsedText = Math.trunc(elapsedTime / hour) + '시간 전';
    } else if (elapsedTime < day * 15) {
      elapsedText = Math.trunc(elapsedTime / day) + '일 전';
    } else {
      elapsedText = createdAt.slice(0, 10);
    }

    return elapsedText;
  };

  const tokenObject = useToken();
  const token = tokenObject?.token;

  return (
    <WholeWrapper>
      <div className='postListTitle'>⚪{selectPostsChannelTitle(currentChannelId)}</div>
      <PostListWrapper>
        {filteredPostsInfo.map((postInfo) => {
          const { title, _id, likes, createdAt, comments, channel } = postInfo;
          const channelId = channel._id;
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
                        ? highlightIncludedText(postTitle, inputSearchValue)
                        : postTitle}
                    </div>
                  </div>
                  <div className='postContent'>
                    {selectedSearchOption === '제목+내용'
                      ? highlightIncludedText(postContent, inputSearchValue)
                      : postContent}
                  </div>
                </div>
              </PostTopWrapper>
              <PostMiddleWrapper>
                <div className='postAuthor'>
                  {selectedSearchOption === '작성자'
                    ? highlightIncludedText(fullName, inputSearchValue)
                    : fullName}
                </div>
                <div className='includedChannel'>{selectPostsChannelTitle(channelId)}</div>
              </PostMiddleWrapper>
              <PostBottomWrapper>
                <div className='likesCommentContatiner'>
                  <img
                    className='likesImg'
                    src='https://cdn.discordapp.com/attachments/1030309344237080636/1064609094020911214/Vector_1.png'
                    alt='좋아요'
                  />
                  <div className='likesNumber'>{likes.length}</div>
                  <img
                    className='commentsImg'
                    src='https://cdn.discordapp.com/attachments/1030309344237080636/1064610348914720898/icon-message-square.png'
                    alt='댓글아이콘'
                  />
                  <div className='commentsNumber'>{comments.length}</div>
                </div>
                <div className='createdAt'>{checkWrittenPostTime(createdAt)}</div>
              </PostBottomWrapper>
            </PostWrapper>
          );
        })}
      </PostListWrapper>
    </WholeWrapper>
  );
};
export default PostList;

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2.5rem;

  .postListTitle {
    font-family: 'HANNA', sans-serif;
    width: 725px;
    height: 3.125rem;
    padding: 0.9375rem 0 0 1.25rem;
    font-size: ${({ theme }) => theme.fontSize.larger};
    border-top-left-radius: 0.3125rem;
    border-top-right-radius: 0.3125rem;
    background-color: ${({ theme }) => theme.colors.primary};
    z-index: 10;
    /* font-size: 22px; */
    font-weight: bold;
  }
`;

const PostListWrapper = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-top: 0rem;
`;

const PostWrapper = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 0.3125rem;
  padding: 1rem 1.25rem;
  gap: 0rem;
  cursor: pointer;
  width: 45.3125rem;
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
    border-radius: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
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
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
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
    width: 3.75rem;
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

  .likesCommentContatiner {
    display: flex;
    width: 87%;

    .likesImg {
      padding-top: 0.0625rem;
      width: 1.0625rem;
      height: 1.0625rem;
    }
    .commentsImg {
      margin-left: 0.625rem;
      width: 1.125rem;
      height: 1.125rem;
    }
    .likesNumber {
      width: 1.25rem;
      margin-left: 0.125rem;
      color: ${({ theme }) => theme.colors.lightGray};
    }
    .commentsNumber {
      width: 1.25rem;
      margin-left: 0.125rem;
      color: ${({ theme }) => theme.colors.lightGray};
    }
  }

  .createdAt {
    margin-left: auto;
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;
