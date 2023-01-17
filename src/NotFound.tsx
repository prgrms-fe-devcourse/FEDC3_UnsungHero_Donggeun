import styled from 'styled-components';

const NotFound = () => {
  return <Error404Image src='https://ifh.cc/g/QdMBYm.jpg'></Error404Image>;
};

export default NotFound;

const Error404Image = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100vw;
  height: 100vh;
`;
