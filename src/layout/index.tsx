import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header>
        <div>언성 히어로(로고)</div>
        <div>검색창 자리</div>
        <ButtonWrapper>
          <button>알림</button>
          <button>사용자</button>
        </ButtonWrapper>
      </Header>
      <Sidebar>sidebar</Sidebar>
      <Main>{children}</Main>
    </>
  );
};

export default Layout;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1a237e;
  height: 64px;
`;

const ButtonWrapper = styled.div``;

const Sidebar = styled.nav`
  background-color: #e8eaf6;
  position: fixed;
  margin-top: 64px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 185px;
  height: 100%;
`;

const Main = styled.div`
  margin-left: 200px;
`;
