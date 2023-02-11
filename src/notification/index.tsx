import useCheckMobile from '../hooks/useCheckMobile';
import MobileNotificationList from './MobileNotificationList';
import NotificationList from './NotificationList';

const NotificationComponent = () => {
  const { mobile } = useCheckMobile();

  return <>{mobile ? <MobileNotificationList /> : <NotificationList />}</>;
};

export default NotificationComponent;
