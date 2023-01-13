import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../types/user';
import styled from 'styled-components';
import useAxios from '../api/useAxios';
import { IPost } from '../types/post';
import { IFollow } from '../types/follow';
import UserPosts from './UserPosts';

interface IUserInfo {
  fullName: string | undefined;
  posts: [];
  image: string;
  coverImage: string;
}

const COVER_IMG_URL = 'https://ifh.cc/g/xBfBwB.png';
const PROFIE_IMG_URL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
const LIKE_IMG_URL = 'https://ifh.cc/g/vmscWK.png';
const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, fetchData } = useAxios<IUser>({
    url: `${API_URL}/users/${id}`,
    method: 'get',
  });
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    fullName: '',
    posts: [],
    image: '',
    coverImage: '',
  });
  const [userFollow, setUserFollow] = useState({
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

  useEffect(() => {
    fetchData();
  }, []);

  const handlemoveEditPage = () => {
    navigate(`/userEdit/${id}`);
  };
  const totalLikes =
    userInfo.posts && userInfo.posts.reduce((acc, cur: Pick<IPost, 'likes'>) => acc + cur.likes.length, 0);
  return (
    <>
      <CoverImg src={userInfo.coverImage} />
      <ProfileImg src={userInfo.image} />
      <div>{userInfo.fullName}</div>
      <div>
        <img src={LIKE_IMG_URL} />
        {totalLikes}
      </div>
      <button onClick={handlemoveEditPage}>내 정보 수정</button>

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
