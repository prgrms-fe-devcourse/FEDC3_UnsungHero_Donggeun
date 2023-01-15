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
      <Channels />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;

export const Main = styled.div`
  margin-left: 200px;
`;
