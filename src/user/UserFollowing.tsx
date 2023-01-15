import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../api/useAxios';
import { IUser } from '../types/user';
import Pagination from './Pagination';

const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const PROFIE_IMG_URL = 'https://ifh.cc/g/35RDD6.png';

const UserFollowing = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const following = state.following;
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data } = useAxios<[]>({
    url: `${API_URL}/users/get-users`,
    method: 'get',
  });

  const followingsList = data?.filter((user: IUser) => following.includes(user._id));
  const handleClickUser = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <>
      <div>팔로잉</div>
      {followingsList &&
        followingsList.slice(offset, offset + limit).map((user: IUser) => (
          <div key={user._id} onClick={() => handleClickUser(user._id)}>
            <img src={user.image && PROFIE_IMG_URL} width='80px' height='80px' />
            <span>{user.fullName}</span>
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
