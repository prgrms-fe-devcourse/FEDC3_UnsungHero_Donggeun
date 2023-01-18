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

const COVER_IMG_URL = 'https://ifh.cc/g/XbvQvj.png';
const LIKE_IMG_URL = 'https://ifh.cc/g/vmscWK.png';

const User = () => {
  const { id: currentPageId } = useParams();
  const userIdContext = useUserId();
  const myUserId = userIdContext?.userId;
  const navigate = useNavigate();

  const { data, fetchData } = useAxios<IUser>({
    url: `/users/${currentPageId}`,
    method: 'get',
  });

  // const [userInfo, setUserInfo] = useState<IUserInfo>({
  //   fullName: '',
  //   posts: [],
  //   coverImage: '',
  // });

  // const { followButton, userFollow } = useFollow(currentPageId as string);

  // useEffect(() => {
  //   setUserInfo({
  //     fullName: data?.fullName,
  //     posts: data?.posts as [],
  //     coverImage: data?.coverImage ?? COVER_IMG_URL,
  //   });
  // }, [data]);

  // useEffect(() => {
  //   fetchData();
  // }, [currentPageId]);

  // const handlemoveEditPage = () => {
  //   navigate(`/userEdit/${currentPageId}`);
  // };

  // const totalLikes = userInfo?.posts?.reduce((acc, cur: Pick<IPost, 'likes'>) => acc + cur.likes.length, 0);

  return (
    <Wrapper>
      {/* <CoverImg src={userInfo.coverImage} alt='커버 이미지' />
      <UserWrapper>
        <Avatar src={data?.image} width={90} height={90} style={{ position: 'relative', top: '-1.875rem' }} />
        <InfoWrapper>
          <UserName>{userInfo.fullName}</UserName>
          <Likes>
            <img src={LIKE_IMG_URL} width='18px' height='18px' />
            {totalLikes}
          </Likes>
        </InfoWrapper>
        {currentPageId === myUserId ? (
          <Button
            text={'내정보 수정'}
            onClick={handlemoveEditPage}
            color='white'
            width={100}
            height={30}
            style={{ marginLeft: 'auto' }}
          />
        ) : (
          followButton(currentPageId as string)
        )}
      </UserWrapper>
      <Follow>
        <Link to={`/following/${currentPageId}`}>
          팔로잉 <span>{userFollow?.following?.length}</span>
        </Link>
        <Link to={`/followers/${currentPageId}`}>
          팔로워 <span>{userFollow?.followers?.length}</span>
        </Link>
      </Follow>
      <List>
        {userInfo?.posts?.length > 0 ? <UserPosts posts={userInfo.posts} /> : <p>작성한 글이 없습니다.</p>}
      </List> */}
    </Wrapper>
  );
};

export default User;

const CoverImg = styled.img`
  display: block;
  width: 100%;
  height: 11.25rem;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 45.313rem;
  border: 1px solid black;
  height: 100%;
  min-height: 640px;
  border: 1px solid ${({ theme }) => theme.colors.boxLine};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
  border-radius: 5px;
  position: relative;
  z-index: 5;
`;

const UserName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: bold;
`;

const UserWrapper = styled.div`
  padding: 0.625rem 1.25rem;
  height: 5rem;
  display: flex;
`;

const InfoWrapper = styled.div`
  display: flex;
  padding-left: 0.625rem;
  flex-direction: column;
`;

const Follow = styled.div`
  padding-left: 1.25rem;
  & span {
    font-weight: bold;
    padding-right: 0.4375rem;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.contentLine};
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  & img {
    margin-right: 0.3125rem;
  }
`;
