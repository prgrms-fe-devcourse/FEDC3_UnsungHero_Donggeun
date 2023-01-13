import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../types/user';
import styled from 'styled-components';
import useAxios from '../api/useAxios';
import Pagination from './Pagination';
import UserPostListItem from './UserPostListItem';

interface IUserInfo {
  fullName: string | undefined;
  posts: [];
  image: string;
  coverImage: string;
}

interface IPost {
  _id: string;
  title: string;
  likes: [];
}

const COVER_IMG_URL = 'https://ifh.cc/g/xBfBwB.png';
const PROFIE_IMG_URL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
const LIKE_IMG_URL = 'https://ifh.cc/g/vmscWK.png';
const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const User = () => {
  const { id } = useParams();
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
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const limit = 7;
  const offset = (page - 1) * limit;

  useEffect(() => {
    setUserInfo({
      fullName: data?.fullName,
      posts: data?.posts as [],
      image: data?.image ?? PROFIE_IMG_URL,
      coverImage: data?.coverImage ?? COVER_IMG_URL,
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
      {userInfo.posts &&
        userInfo.posts
          .slice(offset, offset + limit)
          .map((post: IPost) => <UserPostListItem key={post._id} post={post} />)}
      <Pagination
        total={userInfo.posts && userInfo.posts.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
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
