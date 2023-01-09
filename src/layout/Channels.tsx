import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as L from './layout';

const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

interface ChannelList {
  _id: string;
  name: string;
}

const Channels = () => {
  const [channelList, setChannelList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    requestChannelList();
  }, []);

  const requestChannelList = async () => {
    return await axios.get(`${API_URL}/channels`).then(({ data }) => setChannelList(data));
  };

  const moveChannel = (id: string) => {
    navigate(`/channel/${id}`);
  };

  return (
    <L.Sidebar>
      <L.ChannelTitle>채널목록</L.ChannelTitle>
      {channelList.map((e: ChannelList) => (
        <L.Channel key={e._id} onClick={() => moveChannel(e._id)}>
          {e.name}
        </L.Channel>
      ))}
    </L.Sidebar>
  );
};

export default Channels;
