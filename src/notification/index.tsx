import { useEffect, useState } from 'react';
import MobileNotificationList from './MobileNotificationList';
import NotificationList from './NotificationList';

const NotificationComponent = () => {
  const [mobileStatus, setMobileStatus] = useState(false);

  const checkMobileScreen = () => {
    if (window.innerWidth <= 576) {
      setMobileStatus(true);
      return;
    }

    setMobileStatus(false);
  };

  const handleResize = () => checkMobileScreen();

  useEffect(() => {
    checkMobileScreen();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{mobileStatus ? <MobileNotificationList /> : <NotificationList />}</>;
};

export default NotificationComponent;
