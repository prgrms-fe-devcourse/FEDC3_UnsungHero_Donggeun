import axios from 'axios';
import { useEffect, useState } from 'react';
import NotificationlistItem from './NotificationListItem';
import { INotification, INotificationStatus } from '../types/notification';
import { useToken } from '../contexts/TokenProvider';
import { IToken } from '../types/token';
import { useNotificationStatus } from '../contexts/NotificationStatusProvider';
import { Pagination } from '../common';
import styled from 'styled-components';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Button } from '../common';
import { END_POINT } from '../api/apiAddress';

const NotificationList = () => {
  const [notificationList, setNotificationlist] = useState<INotification[]>();
  const [notificationLength, setNotificationLength] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  const tokenContextObj: IToken | null = useToken();
  const notificationStatusContextObj: INotificationStatus | null = useNotificationStatus();

  const confirmNotificationlist = async () => {
    if (!notificationStatusContextObj?.notificationStatus) return;

    await axios
      .put(
        `${END_POINT}/notifications/seen`,
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
      .get(`${END_POINT}/notifications`, {
        headers: { Authorization: `bearer ${tokenContextObj?.token}` },
      })
      .then((res) => {
        if (notificationLength !== res.data.length || notificationStatusContextObj?.notificationStatus) {
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
    tokenContextObj?.token !== '' && fetchNotificationData();
  }, []);

  // by 민형, notificationList state가 수정되는 경우(token이 있는 경우)에만 fetch 되므로 따로 token check x_230112
  useEffect(() => {
    updateNotificationStatus();
  }, [notificationList]);

  return (
    <>
      <NotificationHeader>
        <IoMdNotificationsOutline className='logo' />
        <div>알림</div>
      </NotificationHeader>
      <NotificationListContainer>
        {notificationList
          ?.slice(offset, offset + limit)
          .map(({ _id, seen: isCheck, comment, like, follow, author, post }) => (
            <NotificationlistItem
              key={_id}
              _id={_id}
              seen={isCheck}
              comment={comment}
              like={like}
              follow={follow}
              author={author}
              post={post}
            />
          ))}
      </NotificationListContainer>

      <NotificationConfirmContainer>
        <Button
          text={'모든 알림 확인'}
          color={'default'}
          width={12.5}
          height={2.5}
          onClick={confirmNotificationlist}
        />
        <Button
          text={'실시간 알람 확인'}
          color={'default'}
          width={12.5}
          height={2.5}
          onClick={fetchNotificationData}
        />
      </NotificationConfirmContainer>

      <Pagination total={notificationList?.length as number} limit={limit} page={page} setPage={setPage} />
    </>
  );
};

export default NotificationList;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 0.9375rem;

  & .logo {
    font-size: 2rem;
  }
`;

const NotificationListContainer = styled.div`
  display: 'flex';
  flex-direction: column;
  width: 45.3125rem;
  border-radius: 0.3125rem;
  border: none;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  background-color: ${(props) => props.theme.colors.white};
`;

const NotificationConfirmContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
