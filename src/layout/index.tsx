import Channels from './Channels';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Wrapper>
        <MainWrapper>
          <Channels />
          <Main>
            <Outlet />
          </Main>
        </MainWrapper>
      </Wrapper>
    </>
  );
};

export default Layout;

const Main = styled.div`
  margin-top: 92px;
  margin-left: 275px;
  width: 725px;
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
`;
const Wrapper = styled.div`
  justify-content: center;
  width: 100%;
`;
