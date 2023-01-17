import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingBackground>
      <img
        src='https://cdn.inflearn.com/public/files/courses/327297/28b360d6-a7b2-48c4-a695-c9550427debd/season2-02-01-keyframes.gif'
        alt='로딩이미지'
      />
    </LoadingBackground>
  );
};

export default Loading;

const LoadingBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
