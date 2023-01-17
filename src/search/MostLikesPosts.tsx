import { IsJsonString } from './isJsonString';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
      case '63b5b7f5a87de522e8646d65':
        MostLikesPostsTitle = '낚시채널 베스트';
        break;
      case '63b5b825a87de522e8646d6f':
        MostLikesPostsTitle = '골프채널 베스트';
        break;
      case '63bbe845400746566c234d41':
        MostLikesPostsTitle = '바둑채널 베스트';
        break;
      default:
        MostLikesPostsTitle = '전체베스트';
    }
    return MostLikesPostsTitle;
  };

  return (
    <WholeWrapper>
      <div className='bestPostsTitle'>#{selectMostLikesPostsTitle()}</div>
      <BestPostsEntireWrapper>
        {filterMostLikesPosts().map((filteredPost) => {
          const { title, _id, likes, comments } = filteredPost;
          const postTitle = IsJsonString(title) ? JSON.parse(title).title : title;
          return (
            <BestPostWrapper key={_id} onClick={() => navigatePost(`/post/${_id}`)}>
              <div className='bestPostTitleDotContainer'>
                <img
                  className='redDot'
                  src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlpwA9%2FbtrWw9zB4Ru%2FUaErr7skbrtVEXLCzMTKR1%2Fimg.png'
                  alt='빨간 점'
                />
                <div className='bestPostTitle'>{postTitle}</div>
              </div>
              <div className='postInfoContainer'>
                <img
                  className='likesImg'
                  src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fmdos4%2FbtrWuNYDtvi%2F7BdrJ7GO6iU7vuoCbMvhek%2Fimg.png'
                  alt='좋아요'
                />
                <div>{likes.length}</div>
                <img
                  className='commentsImg'
                  src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fk7UN0%2FbtrWu7bJfuo%2FPDforMZSQxfDA0lBp3eFE0%2Fimg.png'
                  alt='댓글아이콘'
                />
                <div>{comments.length}</div>
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
  margin: 30px 0 0 0;

  .bestPostsTitle {
    width: 725px;
    height: 50px;
    padding: 15px 0 0 20px;
    margin: 0 0 0px 40px;
    font-size: 20px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: #52d2a4;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.6);
  }
`;

const BestPostsEntireWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const BestPostWrapper = styled.li`
  display: flex;
  flex-direction: column;
  width: 725px;
  height: 75px;
  border-radius: 0px;
  padding: 16px 20px;
  gap: 0px;
  cursor: pointer;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.6);

  .bestPostTitleDotContainer {
    display: flex;
    .redDot {
      align-self: center;
      width: 4px;
      height: 4px;
      margin-bottom: 17px;
    }
    .bestPostTitle {
      font-size: 18px;
      font-weight: 500;
      margin: 0 0 10px 5px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .postInfoContainer {
    display: flex;
    justify-content: end;
    color: #939393;
    /* margin-top: 10px; */

    .likesImg {
      margin-right: 2px;
      padding-top: 1px;
      width: 17px;
      height: 17px;
    }
    .commentsImg {
      margin: 0 2px 0 10px;
      width: 18px;
      height: 18px;
    }
  }
`;
