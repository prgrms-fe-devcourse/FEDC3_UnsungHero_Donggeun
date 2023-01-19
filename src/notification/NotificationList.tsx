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
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { END_POINT } from '../api/apiAddress';
import { IoMdNotificationsOff } from 'react-icons/io';

const NotificationList = () => {
  const [page, setPage] = useState(1);
  const limit = 4;
  const offset = (page - 1) * limit;

  const tokenContextObj: IToken | null = useToken();
  const notificationStatusContextObj: INotificationStatus | null = useNotificationStatus();

  const { data: notificationList, refetch: refetchNotificationList } = useQuery<INotification[]>(
    'notificationListData',
    async () => {
      return await axios
        .get(`${END_POINT}/notifications`, {
          headers: { Authorization: `bearer ${tokenContextObj?.token}` },
        })
        .then(({ data }) => data);
    },
    {
      refetchOnMount: true,
      staleTime: 2000,
    }
  );

  const navigator = useNavigate();

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
        refetchNotificationList();
      });
  };

  const updateNotificationStatus = () => {
    const notificationListData = notificationList?.map(({ seen }) => seen);
    const notificationState = notificationListData?.includes(false);
    notificationStatusContextObj?.setNotification(!!notificationState);
  };

  useEffect(() => {
    !tokenContextObj?.token && navigator('/');
    tokenContextObj?.token && refetchNotificationList();
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

      <NotificationContainer>
        <NoNotificationContainer dataview={!!notificationList?.length}>
          <IoMdNotificationsOff size={80} className='notlogo' />
          <h3>알람이 없습니다.</h3>
        </NoNotificationContainer>

        <NotificationListContainer dataview={!!notificationList?.length}>
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
          <PaginationContainer>
            <Pagination
              total={notificationList?.length as number}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </PaginationContainer>
        </NotificationListContainer>
      </NotificationContainer>

      <NotificationConfirmContainer dataview={!!notificationList?.length}>
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
          onClick={refetchNotificationList}
        />
      </NotificationConfirmContainer>
    </>
  );
};

export default NotificationList;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-top: -0.625rem;
  margin-bottom: 0.5625rem;

  & .logo {
    font-size: 2rem;
  }
`;

const NotificationContainer = styled.div`
  min-height: 40rem;
  width: 45.3125rem;
  border-radius: 0.3125rem;
  border: none;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  background-color: ${(props) => props.theme.colors.white};
  margin-bottom: 1.875rem;

  position: relative;

  & .notlogo {
    font-size: 5rem;
  }

  & .notlogo,
  & h3 {
    opacity: 0.5;
  }
`;

const NoNotificationContainer = styled.div<{ dataview: boolean }>`
  display: ${(props) => (props.dataview ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  padding-top: 6.25rem;
`;

const NotificationListContainer = styled.div<{ dataview: boolean }>`
  display: ${(props) => (props.dataview ? 'flex' : 'none')};
  flex-direction: column;
`;

const NotificationConfirmContainer = styled.div<{ dataview: boolean }>`
  display: ${(props) => (props.dataview ? 'flex' : 'none')};
  justify-content: space-around;
`;

const PaginationContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
