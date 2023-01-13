import axios from 'axios';
import { useToken } from '../contexts/TokenProvider';
import { IToken } from '../types/token';
import { INotification } from '../types/notification';
import { useState, useEffect } from 'react';

const NotificationStatus = () => {
  const [notificationStatusList, setNotificationStatusList] = useState<boolean[]>([]);
  const [notificationStatus, setNotificationStatus] = useState<boolean>();
  const tokenContextObj: IToken | null = useToken();

  const fetchNotificationData = async () => {
    await axios
      .get('http://kdt.frontend.3rd.programmers.co.kr:5006/notifications', {
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
    if (notificationStatusList.indexOf(false) !== -1) setNotificationStatus(true);
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);

  useEffect(() => {
    checkNotificationStatus();
  }, [notificationStatusList]);

  return (
    <>
      {notificationStatus && (
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'green' }}></div>
      )}
    </>
  );
};

export default NotificationStatus;
