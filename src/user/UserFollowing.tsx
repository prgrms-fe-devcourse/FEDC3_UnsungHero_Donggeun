import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Pagination } from '../common';
import useFollow from '../hooks/useFollow';
import { IUser } from '../types/user';
import { END_POINT } from '../api/apiAddress';
import FollowListItem from './FollowListItem';
import useCheckMobile from '../hooks/useCheckMobile';

const UserFollowing = () => {
  const { id } = useParams();
  const { userFollow } = useFollow(id as string);
  const { mobile } = useCheckMobile();
  const [page, setPage] = useState(1);
  const limit = 6;
  const offset = (page - 1) * limit;

  const { data: followingData } = useQuery(
    'followingData',
    async () => {
      return axios.get(`${END_POINT}/users/get-users`).then(({ data }) => data);
    },
    {
      refetchOnMount: true,
      staleTime: 3000,
    }
  );

  const followingsList = followingData?.filter((user: IUser) => userFollow?.following?.includes(user._id));

  return (
    <Wrapper>
      <Title>팔로잉</Title>
      {mobile
        ? followingsList?.map((user: IUser) => (
            <FollowListItem key={user._id} _id={user._id} fullName={user.fullName} image={user.image} />
          ))
        : followingsList
            ?.slice(offset, offset + limit)
            .map((user: IUser) => (
              <FollowListItem key={user._id} _id={user._id} fullName={user.fullName} image={user.image} />
            ))}
      {followingsList?.length < 1 ? (
        <Nothing>팔로잉한 계정이 없습니다.</Nothing>
      ) : (
        !mobile && (
          <Pagination total={followingsList?.length as number} limit={limit} page={page} setPage={setPage} />
        )
      )}
    </Wrapper>
  );
};

export default UserFollowing;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 45.313rem;
  margin-top: 1.875rem;
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
