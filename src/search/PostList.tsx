import styled from 'styled-components';
import { IsJsonString } from './isJsonString';
import { useNavigate } from 'react-router-dom';

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
  console.log(Date());
  const navigatePost = useNavigate();

  const selectPostsChannelTitle = () => {
    let PostsChannelTitle = '';
    switch (currentChannelId) {
      case '63b5b7f5a87de522e8646d65':
        PostsChannelTitle = '낚시채널';
        break;
      case '63b5b825a87de522e8646d6f':
        PostsChannelTitle = '골프채널';
        break;
      case '63bbe845400746566c234d41':
        PostsChannelTitle = '바둑채널';
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
            <PostWrapper key={_id} onClick={() => navigatePost(`/post/${_id}`)}>
              <PostTopWrapper>
                {image === undefined ? (
                  <ProfileImg src='https://ifh.cc/g/35RDD6.png' alt='기본 프로필 이미지' />
                ) : (
                  <ProfileImg src={image} alt='프로필 이미지' />
                )}
                <div className='postTitleContentContainer'>
                  <div className='postTitleDotContainer'>
                    <img
                      className='redDot'
                      src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlpwA9%2FbtrWw9zB4Ru%2FUaErr7skbrtVEXLCzMTKR1%2Fimg.png'
                      alt='빨간 점'
                    />
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

  .postListTitle {
    width: 725px;
    height: 50px;
    padding: 15px 0 0 20px;
    margin: 0 0 3px 40px;
    font-size: 20px;
    box-shadow: 0 1px 1.5px rgba(0, 0, 0, 0.6);
    border-radius: 3px;
    background-color: #52d2a4;
  }
`;

const PostListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  background-color: #ffffff;
`;

const PostWrapper = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  padding: 16px 20px;
  gap: 0px;
  cursor: pointer;
  width: 725px;
  height: 200px;
  margin-bottom: 15px;
  box-shadow: 0 1px 1.5px rgba(0, 0, 0, 0.6);
`;

const PostTopWrapper = styled.div`
  display: flex;

  .postTitleContentContainer {
    width: 100%;

    .postTitleDotContainer {
      display: flex;
      .redDot {
        align-self: center;
        width: 4px;
        height: 4px;
        margin: 0 0 8px 20px;
      }

      .postTitle {
        margin: 10px 10px 10px 0px;
        font-size: 18px;
        font-weight: 500;
        padding-left: 5px;
        white-space: nowrap;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .postContent {
    margin: 8px 8px 8px 17px;
    font-size: 15px;
    color: gray;
    padding-left: 13px;
    white-space: nowrap;
  }
`;

const PostMiddleWrapper = styled.div`
  width: 100%;
  height: 70px;
  margin-bottom: 10px;
  border-bottom: 1px solid #b1b1b1;
  font-size: 15px;

  .postAuthor {
    display: flex;
    justify-content: center;
    font-weight: 500;
    margin-bottom: 20px;
    width: 80px;
  }

  .includedChannel {
    display: flex;
    justify-content: center;
    width: 80px;
    margin: 10px 0 25px 0px;
    color: #939393;
    font-size: 12px;
    line-height: 19px;
    font-weight: 900;
    padding: 4px 8px;
    border-radius: 6px;
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
      padding-top: 1px;
      width: 17px;
      height: 17px;
    }
    .commentsImg {
      margin-left: 10px;
      width: 18px;
      height: 18px;
    }
    .likesNumber {
      margin-left: 2px;
      color: #939393;
    }
    .commentsNumber {
      margin-left: 2px;
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
  margin-left: 10px;
  width: 60px;
  height: 60px;
`;
