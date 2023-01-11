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

  const viewAlarmList = async () => {
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

  const checkAlarmStatus = () => {
    const seenData = alarmList?.map(({ seen }) => seen);
    const status = seenData?.includes(false);
    setAlramStatus(status);
  };

  useEffect(() => {
    viewAlarmList();
  }, []);

  useEffect(() => {
    checkAlarmStatus();
  }, [alarmList]);

  return (
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
  );
};

export default AlarmList;
