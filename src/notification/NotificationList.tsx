import axios from 'axios';
import { useEffect, useState } from 'react';
import NotificationlistItem from './NotificationListItem';
import { INotification } from '../types/notification';

const TOKEN_KEY = 'token';

const NotificationList = () => {
  const [notificationList, setNotificationlist] = useState<INotification[]>();
  const [notificationStatus, setNotificationStatus] = useState<boolean | undefined>(true);
  const [showedNotificationListStatus, setShowedNotificationListStatus] = useState(false);

  // by 민형, 이미 모든 알람을 열어본 경우에는 해당 로직이 수행되지 않도록(리팩토링)_230111
  const confirmNotificationlist = async () => {
    const item = localStorage.getItem(TOKEN_KEY);
    const storedValue = item ? JSON.parse(item) : '';
    await axios
      .put(
        'http://kdt.frontend.3rd.programmers.co.kr:5006/notifications/seen',
        {},
        {
          headers: { Authorization: `bearer ${storedValue}` },
        }
      )
      .then((res) => {
        fetchNotificationData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchNotificationData = async () => {
    const item = localStorage.getItem(TOKEN_KEY);
    const storedValue = item ? JSON.parse(item) : '';

    await axios
      .get('http://kdt.frontend.3rd.programmers.co.kr:5006/notifications', {
        headers: { Authorization: `bearer ${storedValue}` },
      })
      .then((res) => {
        setNotificationlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateNotificationStatus = () => {
    const notificationListData = notificationList?.map(({ seen }) => seen);
    const notificationStatus = notificationListData?.includes(false);
    setNotificationStatus(notificationStatus);
  };

  const toggleShowedNotificationListStatus = () =>
    setShowedNotificationListStatus((prevStatus) => !prevStatus);

  useEffect(() => {
    fetchNotificationData();
  }, []);

  useEffect(() => {
    updateNotificationStatus();
  }, [notificationList]);

  return (
    <>
      <button onClick={toggleShowedNotificationListStatus} style={{ width: '100vw' }}>
        알림 목록 리스트 Render
      </button>
      {showedNotificationListStatus && (
        <>
          <button onClick={confirmNotificationlist} style={{ width: '100vw' }}>
            모든 알림 확인
          </button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {notificationList?.map(({ _id, seen: isCheck, comment }) => (
              <NotificationlistItem key={_id} _id={_id} seen={isCheck} comment={comment} />
            ))}
            {notificationStatus && (
              <>
                <div>현재 알람 상태</div>
                <div
                  style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'green' }}
                ></div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default NotificationList;
