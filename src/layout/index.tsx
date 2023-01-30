import { useState, useEffect } from 'react';
import Channels from './Channels';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

interface IProps {
  menuOpen: boolean;
}

const Layout = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);
  return (
    <>
      <Wrapper>
        <MainWrapper>
          <SidebarBackground onClick={() => setMenuOpen(false)} menuOpen={menuOpen} />
          <Channels menuOpen={menuOpen} />
          <Main>
            <Outlet />
          </Main>
        </MainWrapper>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </Wrapper>
    </>
  );
};

export default Layout;

const Main = styled.div`
  margin-top: 5.75rem;
  margin-left: 17.1875rem;
  width: 100vw;
  max-width: 725px;
  margin-bottom: 3.75rem;
  @media (max-width: ${({ theme }) => theme.media.moblie}) {
    margin-left: 0;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;

  max-width: 1000px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const SidebarBackground = styled.div<IProps>`
  @media (max-width: ${({ theme }) => theme.media.moblie}) {
    z-index: 250;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.5s ease-out;
    background-color: ${({ menuOpen }) => (menuOpen ? 'rgba(0, 0, 0, 0.2)' : '')};
    visibility: ${({ menuOpen }) => (menuOpen ? 'visible' : 'hidden')};
  }
`;
