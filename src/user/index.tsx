import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IPost } from '../types/post';
import UserPosts from './UserPosts';
import { useUserId } from '../contexts/TokenProvider';
import useFollow from '../hooks/useFollow';
import { Avatar, Button } from '../common';
import Skeleton from '../common/Skeleton';
import MobileUserPosts from './MobileUserPosts';
import useCheckMobile from '../hooks/useCheckMobile';

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
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    fullName: '',
    posts: [],
    coverImage: '',
  });
  const { mobile } = useCheckMobile();

  const {
    followButton,
    userFollow,
    currentData: userData,
    fetchCurrentData: refetchUserData,
    isLoading,
  } = useFollow(currentPageId as string);

  useEffect(() => {
    setUserInfo({
      fullName: userData?.fullName,
      posts: userData?.posts as [],
      coverImage: userData?.coverImage ?? COVER_IMG_URL,
    });
  }, [userData]);

  useEffect(() => {
    refetchUserData();
  }, [currentPageId]);

  const handlOnClickMoveEditPage = () => {
    navigate(`/userEdit/${currentPageId}`);
  };

  const totalLikes = userInfo?.posts?.reduce((acc, cur: Pick<IPost, 'likes'>) => acc + cur.likes.length, 0);
  const userPostListComponent = mobile ? <MobileUserPosts /> : <UserPosts posts={userInfo.posts} />;
  return (
    <Wrapper>
      <CoverImg src={userInfo.coverImage} alt='커버 이미지' />
      {isLoading ? (
        <>
          <UserWrapper>
            <AvatarSkeleton>
              <Skeleton.Circle size={90} />
            </AvatarSkeleton>
          </UserWrapper>
          <List>
            <ListSkeleton>
              <Skeleton.Box width={600} height={400} />
            </ListSkeleton>
          </List>
        </>
      ) : (
        <>
          <UserWrapper>
            <Avatar
              src={userData?.image}
              width={90}
              height={90}
              style={{ position: 'relative', top: '-1.875rem' }}
            />
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
                onClick={handlOnClickMoveEditPage}
                color='white'
                width={6.25}
                height={1.875}
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
          <List>{userInfo?.posts?.length > 0 ? userPostListComponent : <p>작성한 글이 없습니다.</p>}</List>
        </>
      )}
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
  margin-top: 1.875rem;
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 45.313rem;
  min-height: 640px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  border-radius: 5px;
  position: relative;
  z-index: 5;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-top: -16px;
  }
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

const AvatarSkeleton = styled.div`
  position: relative;
  top: -1.875rem;
`;

const ListSkeleton = styled.div`
  margin: 2rem;
`;
