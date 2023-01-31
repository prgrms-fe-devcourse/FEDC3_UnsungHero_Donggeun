import axios from 'axios';
import { useEffect, useRef } from 'react';
import NotificationlistItem from './NotificationListItem';
import { INotification, INotificationStatus } from '../types/notification';
import { useToken } from '../contexts/TokenProvider';
import { IToken } from '../types/token';
import { useNotificationStatus } from '../contexts/NotificationStatusProvider';
import styled from 'styled-components';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Button } from '../common';
import { useNavigate } from 'react-router-dom';
import { END_POINT } from '../api/apiAddress';
import { IoMdNotificationsOff } from 'react-icons/io';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useMobileButtonSendData } from './useMobileButtonSendData';

const MobileNotificationList = () => {
  const infiniteRef = useRef(null);

  const tokenContextObj: IToken | null = useToken();
  const notificationStatusContextObj: INotificationStatus | null = useNotificationStatus();

  const {
    page: currentPage,
    list: notificationList,
    sendQuery: refetchNotificationList,
  } = useIntersectionObserver({ url: '/notifications', loader: infiniteRef });
  const { confirmMobileNotificationList, renderRealTimeMobileNotificationList } = useMobileButtonSendData({
    token: tokenContextObj?.token,
    page: currentPage,
  });

  const navigator = useNavigate();

  const viewAllNotificationList = async () => {
    if (!notificationStatusContextObj?.notificationStatus) return;

    await axios
      .put(
        `${END_POINT}/notifications/seen`,
        {},
        {
          headers: { Authorization: `bearer ${tokenContextObj?.token}` },
        }
      )
      .then(async () => {
        refetchNotificationList(await confirmMobileNotificationList());
      });
  };

  const updateNotificationStatus = () => {
    const notificationListData = notificationList?.map(({ seen }: any) => seen);
    const notificationState = notificationListData?.includes(false);
    notificationStatusContextObj?.changeNotificationStatus(!!notificationState);
  };

  useEffect(() => {
    !tokenContextObj?.token && navigator('/');
  }, []);

  useEffect(() => {
    updateNotificationStatus();
  }, [notificationList]);

  return (
    <>
      <NotificationHeader>
        <IoMdNotificationsOutline className='logo' />
        <div>알림</div>
      </NotificationHeader>

      <NotificationConfirmContainer dataview={!!notificationList?.length}>
        <Button
          text={'모든 알림 확인'}
          color={'default'}
          width={12.5}
          height={2.5}
          onClick={viewAllNotificationList}
        />
        <Button
          text={'실시간 알람 확인'}
          color={'default'}
          width={12.5}
          height={2.5}
          onClick={async () => refetchNotificationList(await renderRealTimeMobileNotificationList())}
        />
      </NotificationConfirmContainer>

      <NotificationContainer>
        <NoNotificationContainer dataview={!!notificationList?.length}>
          <IoMdNotificationsOff size={80} className='notlogo' />
          <h3>알람이 없습니다.</h3>
        </NoNotificationContainer>

        <NotificationListContainer dataview={!!notificationList?.length}>
          {notificationList.map(
            ({ _id, seen: isCheck, comment, like, follow, author, post }: INotification) => (
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
            )
          )}
          <InfiniteScrollDiv ref={infiniteRef}></InfiniteScrollDiv>
        </NotificationListContainer>
      </NotificationContainer>
    </>
  );
};

export default MobileNotificationList;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-top: -0.625rem;
  margin-bottom: 1.25rem;

  & .logo {
    font-size: 2rem;
  }

  @media (max-width: ${({ theme }) => theme.media.moblie}) {
    display: none;
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

  @media (max-width: ${({ theme }) => theme.media.moblie}) {
    width: 100vw;
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
  justify-content: space-evenly;
  margin-bottom: 1.25rem;

  @media (max-width: ${({ theme }) => theme.media.moblie}) {
    & button {
      width: 45vw;
    }
  }
`;

const InfiniteScrollDiv = styled.div``;
