import React, { useState, createContext, useContext } from 'react';
import { INotificationStatus } from '../types/notification';

const notificationStatusContext = createContext<INotificationStatus | null>(null);

export const useNotificationStatus = () => useContext(notificationStatusContext);

const NotificationStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [notificationStatus, setNotificationStatus] = useState(false);

  const setNotification = (bool: boolean) => setNotificationStatus(bool);

  return (
    <notificationStatusContext.Provider value={{ notificationStatus, setNotification }}>
      {children}
    </notificationStatusContext.Provider>
  );
};

export default NotificationStatusProvider;
