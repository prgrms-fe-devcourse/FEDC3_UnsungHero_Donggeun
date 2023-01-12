import axios from 'axios';
import { useEffect, useState } from 'react';
import AlarmListItem from './AlarmListItem';

interface IComment {
  comment: string;
}

interface IAlarm {
  seen: boolean;
  _id: string;
  user: string;
  comment: IComment;
  post: string;
}

const TOKEN_KEY = 'token';

const AlarmList = () => {
  const [alarmList, setAlarmList] = useState<IAlarm[]>();
  const [alramStatus, setAlramStatus] = useState<boolean | undefined>(true);
  const [showedAlarm, setShowedAlarm] = useState(false);

  // by 민형, 이미 모든 알람을 열어본 경우에는 해당 로직이 수행되지 않도록(리팩토링)_230111
  const confirmAlarmList = async () => {
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
        fetchAlarmData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAlarmData = async () => {
    const item = localStorage.getItem(TOKEN_KEY);
    const storedValue = item ? JSON.parse(item) : '';

    await axios
      .get('http://kdt.frontend.3rd.programmers.co.kr:5006/notifications', {
        headers: { Authorization: `bearer ${storedValue}` },
      })
      .then((res) => {
        setAlarmList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewAlarmList = async () => {
    if (showedAlarm) {
      setShowedAlarm(false);
      return;
    }

    setShowedAlarm(true);
  };

  const checkAlarmStatus = () => {
    const seenData = alarmList?.map(({ seen }) => seen);
    const status = seenData?.includes(false);
    setAlramStatus(status);
  };

  useEffect(() => {
    fetchAlarmData();
  }, []);

  useEffect(() => {
    checkAlarmStatus();
  }, [alarmList]);

  return (
    <>
      <button onClick={viewAlarmList} style={{ width: '100vw' }}>
        알림 목록 리스트 Render
      </button>
      {showedAlarm && (
        <>
          <button onClick={confirmAlarmList} style={{ width: '100vw' }}>
            모든 알림 확인
          </button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {alarmList?.map(({ _id, seen, comment }) => (
              <AlarmListItem _id={_id} seen={seen} comment={comment} />
            ))}
            {alramStatus && (
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

export default AlarmList;
