import styled from 'styled-components';
import { IsJsonString } from './isJsonString';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../contexts/TokenProvider';

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

interface IfilteredPostsInfo {
  title: string;
  _id: string;
  author: Iauthor;
  likes: Ilikes[];
  createdAt: string;
  comments: IComments[];
}
interface IpostListProps {
  filteredPostsInfo: IfilteredPostsInfo[];
  selectedSearchOption: string;
  inputSearchValue: string;
  currentChannelId: string | undefined;
}

const Span = styled.span`
  font-weight: 900;
`;

const PostList = ({
  filteredPostsInfo,
  selectedSearchOption,
  inputSearchValue,
  currentChannelId,
}: IpostListProps) => {
  const navigatePost = useNavigate();

  const selectPostsChannelTitle = () => {
    let PostsChannelTitle = '';
    switch (currentChannelId) {
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

  const tokenObject = useToken();
  const token = tokenObject?.token;

  return (
    <WholeWrapper>
      <div className='postListTitle'>#{selectPostsChannelTitle()}</div>
      <PostListWrapper>
        {filteredPostsInfo.map((postInfo, index) => {
          const { title, _id, likes, createdAt, comments } = postInfo;
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
                {image === undefined ? (
                  <ProfileImg src='https://ifh.cc/g/35RDD6.png' alt='기본 프로필 이미지' />
                ) : (
                  <ProfileImg src={image} alt='프로필 이미지' />
                )}
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
                <div className='includedChannel'>{selectPostsChannelTitle()}</div>
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
                <div className='createdAt'>{createdAt.slice(0, 10)}</div>
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
    width: 45.3125rem;
    height: 3.125rem;
    padding: 0.9375rem 0 0 1.25rem;
    margin: 0 0 0.1875rem 0rem;
    font-size: 1.25rem;
    box-shadow: 0 0.0625rem 0.0938rem rgba(0, 0, 0, 0.6);
    border-radius: 0.1875rem;
    background-color: #52d2a4;
  }
`;

const PostListWrapper = styled.ul`
  padding: 0;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  margin-top: 0rem;
`;

const PostWrapper = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 0.1875rem;
  padding: 1rem 1.25rem;
  gap: 0rem;
  cursor: pointer;
  width: 45.3125rem;
  height: 12.5rem;
  margin-bottom: 0.9375rem;
  background-color: white;
  box-shadow: 0 0.0625rem 0.0938rem rgba(0, 0, 0, 0.6);
`;

const PostTopWrapper = styled.div`
  display: flex;

  .postTitleContentContainer {
    width: 100%;

    .postTitleDotContainer {
      display: flex;

      .postTitle {
        margin: 0.625rem 0.625rem 0.625rem 1.875rem;
        font-size: 1.125rem;
        font-weight: 500;
        padding-left: 0.3125rem;
        width: 35.625rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .postContent {
    margin: 0.5rem 0.5rem 0.5rem 1.375rem;
    font-size: 0.9375rem;
    color: gray;
    padding-left: 0.8125rem;
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
  border-bottom: 0.0625rem solid #dce1e8;
  font-size: 0.9375rem;

  .postAuthor {
    display: flex;
    justify-content: center;
    font-weight: 500;
    margin-bottom: 1.25rem;
    width: 5rem;
    white-space: nowrap;
  }

  .includedChannel {
    display: flex;
    justify-content: center;
    width: 5rem;
    margin: 0.625rem 0 1.5625rem 0rem;
    color: #939393;
    font-size: 0.75rem;
    line-height: 1.1875rem;
    font-weight: 900;
    padding: 0.25rem 0.5rem;
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
      color: #939393;
    }
    .commentsNumber {
      width: 1.25rem;
      margin-left: 0.125rem;
      color: #939393;
    }
  }

  .createdAt {
    align-self: flex-end;
    color: #939393;
  }
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  margin-left: 0.625rem;
  width: 3.75rem;
  height: 3.75rem;
`;
