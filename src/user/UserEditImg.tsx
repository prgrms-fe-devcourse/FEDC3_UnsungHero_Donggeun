import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useAxios from '../api/useAxios';
import { Avatar } from '../common';
import { IUser } from '../types/user';
import { END_POINT } from '../api/apiAddress';

const COVER_IMG_URL = 'https://ifh.cc/g/ZSypny.png';
const PROFIE_IMG_URL = 'https://ifh.cc/g/35RDD6.png';
const EDIT_IMG_URL = 'https://ifh.cc/g/2zSYKD.png';

interface IProps {
  id: string | undefined;
  setimgFiles: React.Dispatch<React.SetStateAction<object>>;
}

interface IImage {
  cover?: FormData | string;
  profile?: FormData | string;
}

const UserEditImg = ({ id, setimgFiles }: IProps) => {
  const { data } = useAxios<IUser>({
    url: `${END_POINT}/users/${id}`,
    method: 'get',
  });

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const imgFileRef = useRef<IImage>({
    cover: '',
    profile: '',
  });

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

      imgFileRef.current[type as keyof IImage] = formData;

      setimgFiles(imgFileRef.current);
    }
  };

  return (
    <Wrapper>
      <CoverImgWrapper onClick={() => coverInputRef.current?.click()}>
        <CoverImg src={coverImage} />
        <img src={EDIT_IMG_URL} />
        <CoverFilter />
      </CoverImgWrapper>
      <ProfileImgWrapper onClick={() => profileInputRef.current?.click()}>
        <Avatar
          src={profileImage}
          width={90}
          height={90}
          style={{ position: 'absolute', top: '0', left: '0', zIndex: '7' }}
        />
        <ImgFilter />
      </ProfileImgWrapper>
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

const CoverImgWrapper = styled.div`
  position: relative;
  > img:last-of-type {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
  }
`;

const CoverImg = styled.img`
  display: block;
  width: 100%;
  height: 11.25rem;
`;

const CoverFilter = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
`;

const ProfileImgWrapper = styled.div`
  position: relative;
  top: -1.25rem;
  left: 1.25rem;
  width: 5.625rem;
  height: 5.625rem;
  padding: 0.625rem 1.25rem;
`;

const ImgFilter = styled.div`
  position: absolute;
  border-radius: 50%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9;
`;
