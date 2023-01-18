import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IChannel } from '../types/channel';
import { AiOutlineRight } from 'react-icons/ai';
const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

interface Channel {
  _id: string;
  name: string;
}

const Channels = () => {
  const [channelList, setChannelList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getChannelList();
  }, []);

  const getChannelList = async () => {
    return await axios.get(`${API_URL}/channels`).then(({ data }) => setChannelList(data));
  };

  const handleClickMoveChannel = (id: string) => {
    navigate(`/channel/${id}`);
  };
  const hobbyChannel = channelList.filter((channel: IChannel) => channel.description === '취미');
  const familyChannel = channelList.filter((channel: IChannel) => channel.description === '가족');
  const etcChannel = channelList.filter((channel: IChannel) => channel.description === '기타');
  return (
    <Wrapper>
      <Sidebar>
        <ChannelTitle>취미</ChannelTitle>
        {hobbyChannel.map(({ _id, name }: Channel) => (
          <Channel key={_id} onClick={() => handleClickMoveChannel(_id)}>
            {name}
            <AiOutlineRight />
          </Channel>
        ))}
      </Sidebar>
      <Sidebar>
        <ChannelTitle>가족</ChannelTitle>
        {familyChannel.map(({ _id, name }: Channel) => (
          <Channel key={_id} onClick={() => handleClickMoveChannel(_id)}>
            {name}
            <AiOutlineRight />
          </Channel>
        ))}
      </Sidebar>
      <Sidebar>
        <ChannelTitle>기타</ChannelTitle>
        {etcChannel.map(({ _id, name }: Channel) => (
          <Channel key={_id} onClick={() => handleClickMoveChannel(_id)}>
            {name}
            <AiOutlineRight />
          </Channel>
        ))}
      </Sidebar>
    </Wrapper>
  );
};

export default Channels;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  position: fixed;
  margin-top: 7.6875rem;
  gap: 3.75rem;
`;

const Sidebar = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 12.5rem;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
`;

const ChannelTitle = styled.div`
  text-align: center;
  margin: 1rem 1rem 0.5rem 1rem;
  padding-bottom: 0.625rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.gray};
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primaryDark}80`};
  }
`;
