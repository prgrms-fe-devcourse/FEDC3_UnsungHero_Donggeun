import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../types/user';
import styled from 'styled-components';
import useAxios from '../api/useAxios';
import { IPost } from '../types/post';
import UserPosts from './UserPosts';
import { useUserId } from '../contexts/TokenProvider';
import useFollow from '../follow/useFollow';
import { Avatar, Button } from '../common';

interface IUserInfo {
  fullName: string | undefined;
  posts: [];
  coverImage: string;
}

const COVER_IMG_URL = 'https://ifh.cc/g/xBfBwB.png';
const LIKE_IMG_URL = 'https://ifh.cc/g/vmscWK.png';
const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const User = () => {
  const { id: currentPageId } = useParams();
  const userIdContext = useUserId();
  const myUserId = userIdContext?.userId;
  const navigate = useNavigate();
  const { data, fetchData } = useAxios<IUser>({
    url: `${API_URL}/users/${currentPageId}`,
    method: 'get',
  });
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    fullName: '',
    posts: [],
    coverImage: '',
  });
  const { followButton, userFollow } = useFollow(currentPageId as string);

  useEffect(() => {
    setUserInfo({
      fullName: data?.fullName,
      posts: data?.posts as [],
      coverImage: data?.coverImage ?? COVER_IMG_URL,
    });
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [currentPageId]);

  const handlemoveEditPage = () => {
    navigate(`/userEdit/${currentPageId}`);
  };
  const totalLikes = userInfo?.posts?.reduce((acc, cur: Pick<IPost, 'likes'>) => acc + cur.likes.length, 0);

  return (
    <>
      <CoverImg src={userInfo.coverImage} alt='커버 이미지' />
      <Avatar src={data?.image} width={60} height={60} />
      <div>{userInfo.fullName}</div>
      <div>
        <img src={LIKE_IMG_URL} />
        {totalLikes}
      </div>
      {currentPageId === myUserId ? (
        <Button text={'내정보 수정'} onClick={handlemoveEditPage} color='white' width={100} height={30} />
      ) : (
        followButton(currentPageId as string)
      )}

      <Link to={`/following/${currentPageId}`}>팔로잉 {userFollow?.following?.length}</Link>
      <Link to={`/followers/${currentPageId}`}>팔로워 {userFollow?.followers?.length}</Link>
      {userInfo?.posts?.length > 0 && <UserPosts posts={userInfo.posts} />}
    </>
  );
};

export default User;

const CoverImg = styled.img`
  width: 200px;
  height: 100px;
`;
