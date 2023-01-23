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
  margin-top: 5.75rem;
  margin-left: 17.1875rem;
  width: 45.3125rem;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.media.moblie}) {
    margin-left: 0px;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
