import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../api/useAxios';
import { IUser } from '../types/user';
import Pagination from './Pagination';

const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const PROFIE_IMG_URL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const UserFollowers = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const followers = state.followers;
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data } = useAxios<[]>({
    url: `${API_URL}/users/get-users`,
    method: 'get',
  });

  const followersList = data?.filter((user: IUser) => followers.includes(user._id));
  const handleClickUser = (id: string) => {
    navigate(`/user/${id}`);
  };
  return (
    <>
      <div>팔로워</div>
      {followersList &&
        followersList.slice(offset, offset + limit).map((user: IUser) => (
          <div key={user._id} onClick={() => handleClickUser(user._id)}>
            <img src={user.image && PROFIE_IMG_URL} width='80px' height='80px' />
            <span>{user.fullName}</span>
          </div>
        ))}
      {followersList && followersList.length < 1 ? (
        <p>팔로워가 없습니다.</p>
      ) : (
        <Pagination total={followersList?.length as number} limit={limit} page={page} setPage={setPage} />
      )}
    </>
  );
};

export default UserFollowers;
