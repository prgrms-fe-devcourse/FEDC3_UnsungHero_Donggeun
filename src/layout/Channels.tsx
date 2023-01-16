import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

  return (
    <Sidebar>
      <ChannelTitle>채널목록</ChannelTitle>
      {channelList.map(({ _id, name }: Channel) => (
        <Channel key={_id} onClick={() => handleClickMoveChannel(_id)}>
          {name}
        </Channel>
      ))}
    </Sidebar>
  );
};

export default Channels;

const Sidebar = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  position: fixed;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 240px;
  margin-top: 123px;
  height: 100vh;
`;

const ChannelTitle = styled.div`
  margin-bottom: 20px;
`;

const Channel = styled.div`
  margin-bottom: 20px;
`;
