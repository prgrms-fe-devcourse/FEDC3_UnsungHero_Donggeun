import axios from 'axios';
import { useToken } from '../contexts/TokenProvider';
import { IToken } from '../types/token';
import { useNotificationStatus } from '../contexts/NotificationStatusProvider';
import { INotification, INotificationStatus } from '../types/notification';
import { useState, useEffect } from 'react';
import { END_POINT } from '../api/apiAddress';

const NotificationStatus = () => {
  const [notificationStatusList, setNotificationStatusList] = useState<boolean[]>([]);
  const tokenContextObj: IToken | null = useToken();
  const notificationStatusContextObj: INotificationStatus | null = useNotificationStatus();

  const fetchNotificationData = async () => {
    await axios
      .get(`${END_POINT}/notifications`, {
        headers: { Authorization: `bearer ${tokenContextObj?.token}` },
      })
      .then((res) => {
        const serverData = res.data;
        const allSeenCheckData = serverData.map((data: INotification) => data.seen);
        setNotificationStatusList(allSeenCheckData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkNotificationStatus = () => {
    if (notificationStatusList.includes(false)) notificationStatusContextObj?.setNotification(true);
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);

  useEffect(() => {
    checkNotificationStatus();
  }, [notificationStatusList]);

  return (
    <>
      {notificationStatusContextObj?.notificationStatus && (
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'green' }}></div>
      )}
    </>
  );
};

export default NotificationStatus;
