import React from 'react';
import Channels from './Channels';
import Header from './Header';
import styled from 'styled-components';
import Search from '../search/Index';
import { useState } from 'react';
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [selectedChannelId, setSelectedChannelId] = useState('');
  return (
    <>
      <Header />
      <Channels setSelectedChannelId={setSelectedChannelId} />
      <Main>
        {children}
        <Search channelId={selectedChannelId} />
      </Main>
    </>
  );
};

export default Layout;

export const Main = styled.div`
  margin-left: 200px;
`;
