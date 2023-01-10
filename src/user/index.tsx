import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserPostListItem from './UserPostListItem';

interface IUserInfo {
  fullName: string;
  posts: [];
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
  const [profileImage, setProfileImage] = useState(PROFIE_IMG_URL);
  const [coverImage, setCoverImage] = useState(COVER_IMG_URL);
  const [user, setUser] = useState<IUserInfo>({
    fullName: '',
    posts: [],
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    await axios.get(`${API_URL}/users/${id}`).then(({ data }) => {
      setUser({
        fullName: data.fullName,
        posts: data.posts,
      });
    });
  };

  const handlemoveEditPage = () => {
    navigate(`/userEdit/${id}`);
  };
  const totalLikes = user.posts.reduce((acc, cur: Pick<IPost, 'likes'>) => acc + cur.likes.length, 0);

  return (
    <>
      <CoverImg src={coverImage} />
      <ProfileImg src={profileImage} />
      <div>{user.fullName}</div>
      <div>
        <img src={LIKE_IMG_URL} />
        {totalLikes}
      </div>
      <button onClick={handlemoveEditPage}>내 정보 수정</button>
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
