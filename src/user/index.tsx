import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../types/user';
import styled from 'styled-components';
import useAxios from '../api/useAxios';
import { IPost } from '../types/post';
import { IFollow } from '../types/follow';
import UserPosts from './UserPosts';
import { useUserId } from '../contexts/TokenProvider';

interface IUserInfo {
  fullName: string | undefined;
  posts: [];
  image: string;
  coverImage: string;
}

interface IFollowList {
  followers: string[];
  following: string[];
}

const COVER_IMG_URL = 'https://ifh.cc/g/xBfBwB.png';
const PROFIE_IMG_URL = 'https://ifh.cc/g/35RDD6.png';
const LIKE_IMG_URL = 'https://ifh.cc/g/vmscWK.png';
const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const User = () => {
  const { id: currentPageId } = useParams();
  const userIdContext = useUserId();
  const myUserId = userIdContext?.userId;
  const navigate = useNavigate();
  const { data } = useAxios<IUser>({
    url: `${API_URL}/users/${currentPageId}`,
    method: 'get',
  });
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    fullName: '',
    posts: [],
    image: '',
    coverImage: '',
  });
  const [userFollow, setUserFollow] = useState<IFollowList>({
    followers: [],
    following: [],
  });

  useEffect(() => {
    setUserInfo({
      fullName: data?.fullName,
      posts: data?.posts as [],
      image: data?.image ?? PROFIE_IMG_URL,
      coverImage: data?.coverImage ?? COVER_IMG_URL,
    });
    const followerList = data?.followers.map((user: IFollow) => user.user);
    const followingList = data?.following.map((user: IFollow) => user.user);

    setUserFollow({
      followers: followerList as [],
      following: followingList as [],
    });
  }, [data]);

  const handlemoveEditPage = () => {
    navigate(`/userEdit/${currentPageId}`);
  };
  const totalLikes =
    userInfo.posts && userInfo.posts.reduce((acc, cur: Pick<IPost, 'likes'>) => acc + cur.likes.length, 0);

  const followbutton = userFollow?.followers?.includes(myUserId as string) ? (
    <button>팔로잉</button>
  ) : (
    <button>팔로우</button>
  );
  return (
    <>
      <CoverImg src={userInfo.coverImage} />
      <ProfileImg src={userInfo.image} />
      <div>{userInfo.fullName}</div>
      <div>
        <img src={LIKE_IMG_URL} />
        {totalLikes}
      </div>
      {currentPageId === myUserId ? <button onClick={handlemoveEditPage}>내 정보 수정</button> : followbutton}

      <Link to={`/followers`} state={{ followers: userFollow.followers }}>
        팔로워: {userFollow.followers && userFollow.followers.length}
      </Link>
      <Link to={`/following`} state={{ following: userFollow.following }}>
        팔로잉: {userFollow.following && userFollow.following.length}
      </Link>
      {userInfo.posts && userInfo.posts.length > 0 && <UserPosts posts={userInfo.posts} />}
    </>
  );
};

export default User;

const CoverImg = styled.img`
  width: 200px;
  height: 100px;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 50px;
`;
