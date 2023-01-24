import { useEffect, useState } from 'react';
import MobileNotificationList from './MobileNotificationList';
import NotificationList from './NotificationList';

const NotificationComponent = () => {
  const [mobileStatus, setMobileStatus] = useState(false);
  const handleResize = () => {
    if (window.innerWidth <= 576) setMobileStatus(true);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{mobileStatus ? <MobileNotificationList /> : <NotificationList />}</>;
};

export default NotificationComponent;
