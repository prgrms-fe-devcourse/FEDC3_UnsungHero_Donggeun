import React from 'react';
import Channels from './Channels';
import Header from './Header';
import * as L from './layout';
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Channels />
      <L.Main>{children}</L.Main>
    </>
  );
};

export default Layout;
