import styled from 'styled-components';

const PROFIE_IMG_URL = 'https://ifh.cc/g/35RDD6.png';

interface IProps {
  src: string | undefined;
  width: number;
  height: number;
}

const Avatar = ({ src, width, height }: IProps) => {
  const imgSrc = src ?? PROFIE_IMG_URL;
  return <Img src={imgSrc} alt='프로필 이미지' width={`${width}px`} height={`${height}px`} />;
};

export default Avatar;

const Img = styled.img`
  border-radius: 50%;
`;
