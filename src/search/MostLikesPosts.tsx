import { IsJsonString } from './isJsonString';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useToken } from '../contexts/TokenProvider';
interface Ilikes {
  _id: string;
}

interface IComment {
  _id: string;
}

interface Iauthor {
  fullName: string;
  username: string;
  image: string | undefined;
}

interface IpostsInfo {
  title: string;
  _id: string;
  author: Iauthor;
  likes: Ilikes[];
  createdAt: string;
  comments: IComment[];
}

interface IMostLikesPostsProps {
  postsInfo: IpostsInfo[];
  currentChannelId: string | undefined;
}

const MostLikesPosts = ({ postsInfo, currentChannelId }: IMostLikesPostsProps) => {
  const navigatePost = useNavigate();

  const filterMostLikesPosts = () => {
    const PostsInfo = [...postsInfo];
    const filteredMostLikesPosts = PostsInfo.sort((a, b) => {
      if (a.likes.length > b.likes.length) {
        return -1;
      } else if (a.likes.length < b.likes.length) {
        return 1;
      } else {
        return 0;
      }
    })
      .slice(0, 4)
      .filter((postInfo) => {
        return postInfo.likes.length !== 0;
      });

    return filteredMostLikesPosts;
  };

  const selectMostLikesPostsTitle = () => {
    let MostLikesPostsTitle = '';
    switch (currentChannelId) {
      case '63c775d2a989ba6d232518ce':
        MostLikesPostsTitle = '바둑 베스트';
        break;
      case '63c775dba989ba6d232518d3':
        MostLikesPostsTitle = '골프 베스트';
        break;
      case '63c775e0a989ba6d232518dc':
        MostLikesPostsTitle = '낚시 베스트';
        break;
      case '63c775f3a989ba6d232518ef':
        MostLikesPostsTitle = '육아 베스트';
        break;
      case '63c775fea989ba6d23251905':
        MostLikesPostsTitle = '잡담 베스트';
        break;
      default:
        MostLikesPostsTitle = '전체베스트';
    }
    return MostLikesPostsTitle;
  };

  const tokenObject = useToken();
  const token = tokenObject?.token;

  return (
    <WholeWrapper>
      <div className='bestPostsTitle'>#{selectMostLikesPostsTitle()}</div>
      <BestPostsEntireWrapper>
        {filterMostLikesPosts().map((filteredPost) => {
          const { title, _id, likes, comments } = filteredPost;
          const postTitle = IsJsonString(title) ? JSON.parse(title).title : title;
          return (
            <BestPostWrapper
              key={_id}
              onClick={() => {
                if (token) {
                  navigatePost(`/post/${_id}`);
                } else {
                  navigatePost('/login');
                }
              }}
            >
              <div className='bestPostTitleDotContainer'>
                <div className='bestPostTitle'>{postTitle}</div>
              </div>
              <div className='postInfoContainer'>
                <img
                  className='likesImg'
                  src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fmdos4%2FbtrWuNYDtvi%2F7BdrJ7GO6iU7vuoCbMvhek%2Fimg.png'
                  alt='좋아요'
                />
                <div className='likesNumber'>{likes.length}</div>
                <img
                  className='commentsImg'
                  src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fk7UN0%2FbtrWu7bJfuo%2FPDforMZSQxfDA0lBp3eFE0%2Fimg.png'
                  alt='댓글아이콘'
                />
                <div className='commentsNumber'>{comments.length}</div>
              </div>
            </BestPostWrapper>
          );
        })}
      </BestPostsEntireWrapper>
    </WholeWrapper>
  );
};

export default MostLikesPosts;

const WholeWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 1.875rem 0 0 0;

  .bestPostsTitle {
    width: 45.3125rem;
    height: 3.125rem;
    padding: 0.9375rem 0 0 1.25rem;
    margin: 0 0 0rem 0rem;
    font-size: 1.25rem;
    border-top-left-radius: 0.1875rem;
    border-top-right-radius: 0.1875rem;
    background-color: #52d2a4;
    box-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.6);
  }
`;

const BestPostsEntireWrapper = styled.ul`
  width: 45.3125rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const BestPostWrapper = styled.li`
  display: flex;
  flex-direction: column;
  width: 45.3125rem;
  height: 4.6875rem;
  border-bottom: solid 0.0625rem #dce1e8;
  border-radius: 0rem;
  padding: 1rem 1.25rem;
  gap: 0rem;
  cursor: pointer;
  background-color: white;
  box-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.6);

  .bestPostTitleDotContainer {
    display: flex;
    .redDot {
      align-self: center;
      width: 0.25rem;
      height: 0.25rem;
      margin-bottom: 1.0625rem;
    }
    .bestPostTitle {
      font-size: 1.125rem;
      font-weight: 500;
      margin: 0 0 0.625rem 0.3125rem;
      width: 41.875rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .postInfoContainer {
    display: flex;
    justify-content: end;
    color: #939393;

    .likesImg {
      margin-right: 0.125rem;
      padding-top: 0.0625rem;
      width: 1.0625rem;
      height: 1.0625rem;
    }
    .commentsImg {
      margin: 0 0.125rem 0 0.625rem;
      width: 1.125rem;
      height: 1.125rem;
    }

    .commentsNumber {
      width: 1.25rem;
    }

    .likesNumber {
      width: 1.25rem;
    }
  }
`;
