import { IsJsonString } from './isJsonString';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useToken } from '../contexts/TokenProvider';
import { IChannel } from '../types/channel';

interface IPathname {
  pathname: string | undefined;
}
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
  channel: IChannel;
}

interface IMostLikesPostsProps {
  postsInfo: IpostsInfo[];
  currentChannelId: string | undefined;
}

const MostLikesPosts = ({ postsInfo }: IMostLikesPostsProps) => {
  const navigatePost = useNavigate();

  const filterMostLikesPosts = () => {
    const PostsInfo = [...postsInfo];
    const filteredMostLikesPosts = PostsInfo.sort((a, b) => {
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
    })
      .filter((postInfo) => {
        if (postInfo.channel.name !== '테스트') {
          return postInfo.likes.length !== 0;
        }
      })
      .slice(0, 4);

    return filteredMostLikesPosts;
  };

  const { channelId } = useParams();
  const renderSelectedBestPostTitle = () => {
    let MostLikesPostsTitle = '';

    if (!channelId) MostLikesPostsTitle = '전체 베스트';
    else MostLikesPostsTitle = `${postsInfo[0]?.channel.name} 베스트`;

    return MostLikesPostsTitle;
  };

  const pathname = useLocation().pathname;
  const tokenObject = useToken();
  const token = tokenObject?.token;

  return (
    <WholeWrapper pathname={pathname}>
      <div className='bestPostsTitle'>🔥{renderSelectedBestPostTitle()}</div>
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

const WholeWrapper = styled.div<IPathname>`
  height: auto;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 1.875rem;

  .bestPostsTitle {
    font-family: 'BMHANNAPro';
    font-size: 24px;
    height: 50px;
    padding: 0.9375rem 0 0 1rem;
    border-top-left-radius: 0.3125rem;
    border-top-right-radius: 0.3125rem;
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0.0625rem 0.0625rem ${({ theme }) => theme.colors.shadow};
    font-weight: bold;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-top: 0px;
    width: 100%;
    display: ${(pathname) => `${pathname?.pathname?.includes('search') ? 'none' : 'flex'}`};
  }
`;

const BestPostsEntireWrapper = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const BestPostWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  height: 55px;
  border-bottom: solid 0.0625rem #dce1e8;
  padding: 1rem 0.5rem 0 1rem;
  cursor: pointer;
  background-color: white;
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  .bestPostTitleDotContainer {
    width: 100vw;
    display: flex;
    .bestPostTitle {
      font-size: 1.125rem;
      font-weight: 500;
      /* width: 600px; */
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      @media (max-width: ${({ theme }) => theme.media.mobile}) {
        max-width: 200px;
      }
    }

    &:hover {
      .bestPostTitle {
        text-decoration: underline;
      }
    }
  }

  .postInfoContainer {
    display: flex;
    justify-content: end;
    color: ${({ theme }) => theme.colors.lightGray};

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
