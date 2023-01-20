import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Pagination } from '../common';
import useFollow from '../hooks/useFollow';
import { IUser } from '../types/user';
import { END_POINT } from '../api/apiAddress';

const UserFollowers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { followButton, userFollow } = useFollow(id as string);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data: followersData } = useQuery(
    'followersData',
    async () => {
      return axios.get(`${END_POINT}/users/get-users`).then(({ data }) => data);
    },
    {
      refetchOnMount: true,
      staleTime: 3000,
    }
  );

  const followersList = followersData?.filter((user: IUser) => userFollow?.followers?.includes(user._id));
  const handleClickUser = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <Wrapper>
      <Title>팔로워</Title>
      {followersList &&
        followersList.slice(offset, offset + limit).map((user: IUser) => (
          <div key={user._id} onClick={() => handleClickUser(user._id)}>
            <UserWrapper>
              <Avatar src={user.image} width={80} height={80} />
              <UserName>{user.fullName}</UserName>
              {followButton(user._id)}
            </UserWrapper>
          </div>
        ))}
      {followersList && followersList.length < 1 ? (
        <Nothing>팔로워가 없습니다.</Nothing>
      ) : (
        <Pagination total={followersList?.length as number} limit={limit} page={page} setPage={setPage} />
      )}
    </Wrapper>
  );
};

export default UserFollowers;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 45.313rem;
  margin-top: 1.875rem;
  height: 100%;
  min-height: 40rem;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  border-radius: 5px;
  position: relative;
  z-index: 5;
`;

const Title = styled.h2`
  padding: 1.25rem 1rem;
  margin: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
`;

const Nothing = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray};
  padding: 1rem;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grayHover};
  }
`;

const UserName = styled.span`
  padding-left: 1rem;
`;
