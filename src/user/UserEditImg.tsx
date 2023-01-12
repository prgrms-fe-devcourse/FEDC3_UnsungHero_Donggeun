import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useAxios from '../api/useAxios';
import { IUser } from '../types/user';
import axios from 'axios';

const COVER_IMG_URL = 'https://ifh.cc/g/ZSypny.png';
const PROFIE_IMG_URL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const TOKEN = localStorage.getItem('token');
const headers = {
  Authorization: `bearer ${TOKEN}`,
  'Content-Type': 'multipart/form-data',
};
interface IProps {
  id: string | undefined;
}

const UserEditImg = ({ id }: IProps) => {
  const { data, fetchData } = useAxios<IUser>({
    url: `${API_URL}/users/${id}`,
    method: 'get',
  });

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCoverImage(data?.coverImage ?? COVER_IMG_URL);
    setProfileImage(data?.image ?? PROFIE_IMG_URL);
  }, [data]);

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          type === 'profile'
            ? setProfileImage(reader.result as string)
            : setCoverImage(reader.result as string);
        }
      };

      const formData = new FormData();
      const cover = type === 'profile' ? 'false' : 'true';
      formData.append('isCover', cover);
      formData.append('image', file);

      getChangeImg(formData);
    }
  };

  const getChangeImg = async (formData: FormData) => {
    await axios.post(`${API_URL}/users/upload-photo`, formData, { headers });

    fetchData();
  };

  return (
    <Wrapper>
      <CoverImg src={coverImage} onClick={() => coverInputRef.current?.click()} />
      <ProfileImg src={profileImage} onClick={() => profileInputRef.current?.click()} />
      <input
        type='file'
        style={{ display: 'none' }}
        accept='image/jpg,impge/png,image/jpeg'
        name='profile_img'
        onChange={(e) => handleChangeImg(e, 'profile')}
        ref={profileInputRef}
      />
      <input
        type='file'
        style={{ display: 'none' }}
        accept='image/jpg,impge/png,image/jpeg'
        name='cover_img'
        onChange={(e) => handleChangeImg(e, 'cover')}
        ref={coverInputRef}
      />
    </Wrapper>
  );
};

export default UserEditImg;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoverImg = styled.img`
  width: 400px;
  height: 200px;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;
