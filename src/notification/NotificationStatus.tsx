import axios from 'axios';
import { useToken } from '../contexts/TokenProvider';
import { IToken } from '../types/token';
import { useNotificationStatus } from '../contexts/NotificationStatusProvider';
import { INotification, INotificationStatus } from '../types/notification';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

const NotificationStatus = () => {
  const [notificationStatusList, setNotificationStatusList] = useState<boolean[]>([]);
  const tokenContextObj: IToken | null = useToken();
  const notificationStatusContextObj: INotificationStatus | null = useNotificationStatus();

  useQuery(
    'notificationStatusData',
    async () => {
      return await axios
        .get('https://kdt.frontend.3rd.programmers.co.kr:5006/notifications', {
          headers: { Authorization: `bearer ${tokenContextObj?.token}` },
        })
        .then(({ data }) => data);
    },
    {
      onSuccess: (serverData) => {
        const allSeenCheckData = serverData.map((data: INotification) => data.seen);
        setNotificationStatusList(allSeenCheckData);
      },
    }
  );

  const checkNotificationStatus = () => {
    if (notificationStatusList.includes(false)) notificationStatusContextObj?.setNotification(true);
  };

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
