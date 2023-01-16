import { IsJsonString } from './isJsonString';
import { useNavigate } from 'react-router-dom';
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

  const pickMostLikesPostsTitle = () => {
    let MostLikesPostsTitle = '';
    switch (currentChannelId) {
      case '63b5b7f5a87de522e8646d65':
        MostLikesPostsTitle = '낚시 채널 베스트 공감';
        break;
      case '63b5b825a87de522e8646d6f':
        MostLikesPostsTitle = '골프 채널 베스트 공감';
        break;
      case '63bbe845400746566c234d41':
        MostLikesPostsTitle = '바둑 채널 베스트 공감';
        break;
      default:
        MostLikesPostsTitle = '전체 채널 베스트 공감';
    }
    return <h2>{MostLikesPostsTitle}</h2>;
  };

  return (
    <div>
      {pickMostLikesPostsTitle()}
      <ul>
        {filterMostLikesPosts().map((filteredPost) => {
          const { title, _id, likes, createdAt } = filteredPost;
          const { fullName } = filteredPost.author; //fullName이 아니라 userName이 닉네임인 경우 변경해야함
          const postTitle = IsJsonString(title) ? JSON.parse(title).title : title;
          const postContent = IsJsonString(title) ? JSON.parse(title).content : ' ';
          return (
            <li key={_id} onClick={() => navigatePost(`/post/${_id}`)}>
              <div>제목: {postTitle}</div>
              <div>공감수: {likes.length}</div>
              <div>닉네임: {fullName}</div>
              <div>작성일: {createdAt}</div>
              <div>내용: {postContent}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MostLikesPosts;
