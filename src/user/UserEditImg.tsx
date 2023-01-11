import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const COVER_IMG_URL = 'https://ifh.cc/g/ZSypny.png';
const PROFIE_IMG_URL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const UserEditImg = () => {
  const [profileImage, setProfileImage] = useState(PROFIE_IMG_URL);
  const [coverImage, setCoverImage] = useState(COVER_IMG_URL);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          type === 'profile'
            ? setProfileImage(reader.result as string)
            : setCoverImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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
`;
