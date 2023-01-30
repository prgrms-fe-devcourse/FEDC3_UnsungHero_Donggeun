import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SidebarBackground } from '../layout';
import Channels from '../layout/Channels';
import Navbar from '../layout/Navbar';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <SidebarBackground onClick={() => setMenuOpen(false)} menuOpen={menuOpen} />
      <Channels menuOpen={menuOpen} urlPathname={pathname} />
      <Wrapper>
        <HeaderWrapper>
          <div onClick={() => navigate('/')}>
            <Logo height={64} width='auto' src={process.env.PUBLIC_URL + '/logo.svg'} alt='로고' />
          </div>
        </HeaderWrapper>
      </Wrapper>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Header;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  width: 100%;
  height: 4.75rem;
  position: fixed;
  z-index: 1000;
`;

const HeaderWrapper = styled.header`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.75rem;
  width: 100%;
  max-width: 1000px;
  position: fixed;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 64px;
  width: auto;
  padding: 0.1875rem;
`;
