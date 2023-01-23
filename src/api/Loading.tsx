import styled from 'styled-components';
import Spinner from '../common/Spinner';

const Loading = () => {
  return (
    <LoadingBackground>
      <Spinner size={100} />
    </LoadingBackground>
  );
};

export default Loading;

export const Icon = styled.i`
  display: inline-block;
  vertical-align: middle;
`;

const LoadingBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ffffffb7;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
