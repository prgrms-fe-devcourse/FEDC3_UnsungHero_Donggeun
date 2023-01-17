import React from 'react';
import styled from 'styled-components';

const PROFIE_IMG_URL = 'https://ifh.cc/g/x1rS7L.png';

interface IProps extends React.HTMLAttributes<HTMLElement> {
  src: string | undefined;
  width: number;
  height: number;
}

const Avatar = ({ src, width, height, ...props }: IProps) => {
  const imgSrc = src ?? PROFIE_IMG_URL;
  return (
    <Img
      src={imgSrc}
      alt='프로필 이미지'
      width={`${width}px`}
      height={`${height}px`}
      style={{ ...props.style }}
    />
  );
};

export default Avatar;

const Img = styled.img`
  border-radius: 50%;
`;
