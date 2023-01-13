import axios from 'axios';
import { useEffect, useState } from 'react';
import NotificationlistItem from './NotificationListItem';
import { INotification, INotificationStatus } from '../types/notification';
import { useToken } from '../contexts/TokenProvider';
import { IToken } from '../types/token';
import { useNotificationStatus } from '../contexts/NotificationStatusProvider';

const NotificationList = () => {
  const [notificationList, setNotificationlist] = useState<INotification[]>();
  const [notificationLength, setNotificationLength] = useState(0);

  const tokenContextObj: IToken | null = useToken();
  const notificationStatusContextObj: INotificationStatus | null = useNotificationStatus();

  const confirmNotificationlist = async () => {
    if (!notificationStatusContextObj?.notificationStatus) return;

    await axios
      .put(
        'http://kdt.frontend.3rd.programmers.co.kr:5006/notifications/seen',
        {},
        {
          headers: { Authorization: `bearer ${tokenContextObj?.token}` },
        }
      )
      .then(() => {
        fetchNotificationData();
      });
  };

  const fetchNotificationData = async () => {
    await axios
      .get('http://kdt.frontend.3rd.programmers.co.kr:5006/notifications', {
        headers: { Authorization: `bearer ${tokenContextObj?.token}` },
      })
      .then((res) => {
        if (notificationLength !== res.data.length) {
          setNotificationlist(res.data);
          setNotificationLength(res.data.length);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateNotificationStatus = () => {
    const notificationListData = notificationList?.map(({ seen }) => seen);
    const notificationState = notificationListData?.includes(false);
    notificationStatusContextObj?.setNotification(!!notificationState);
  };

  useEffect(() => {
    tokenContextObj?.token !== null && fetchNotificationData();
  }, []);

  // by 민형, notificationList state가 수정되는 경우(token이 있는 경우)에만 fetch 되므로 따로 token check x_230112
  useEffect(() => {
    updateNotificationStatus();
  }, [notificationList]);

  return (
    <>
      <button onClick={confirmNotificationlist} style={{ width: '100vw' }}>
        모든 알림 확인
      </button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {notificationList?.map(({ _id, seen: isCheck, comment }) => (
          <NotificationlistItem key={_id} _id={_id} seen={isCheck} comment={comment} />
        ))}
      </div>
      <button onClick={fetchNotificationData}>실시간 알람 확인</button>
    </>
  );
};

export default NotificationList;
