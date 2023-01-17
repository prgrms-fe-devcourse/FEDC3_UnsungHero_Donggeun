import React from 'react';
import Channels from './Channels';
import Header from './Header';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Wrapper>
        <MainWrapper>
          <Channels />
          <Main>{children}</Main>
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
  display: flex;
  justify-content: center;
  width: 100%;
`;
