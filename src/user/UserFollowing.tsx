import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../api/useAxios';
import { Avatar, Pagination } from '../common';
import useFollow from '../follow/useFollow';
import { IUser } from '../types/user';

const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const UserFollowing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { followButton, userFollow } = useFollow(id as string);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data } = useAxios<[]>({
    url: `${API_URL}/users/get-users`,
    method: 'get',
  });

  const followingsList = data?.filter((user: IUser) => userFollow?.following?.includes(user._id));
  const handleClickUser = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <>
      <div>팔로잉</div>
      {followingsList &&
        followingsList.slice(offset, offset + limit).map((user: IUser) => (
          <div key={user._id} onClick={() => handleClickUser(user._id)}>
            <Avatar src={user.image} width={80} height={80} />
            <span>{user.fullName}</span>
            {followButton(user._id)}
          </div>
        ))}
      {followingsList && followingsList.length < 1 ? (
        <p>팔로잉한 계정이 없습니다.</p>
      ) : (
        <Pagination total={followingsList?.length as number} limit={limit} page={page} setPage={setPage} />
      )}
    </>
  );
};

export default UserFollowing;
