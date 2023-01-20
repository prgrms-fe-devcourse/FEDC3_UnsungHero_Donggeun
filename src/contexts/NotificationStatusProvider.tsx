import React, { useState, createContext, useContext } from 'react';
import { INotificationStatus } from '../types/notification';

const notificationStatusContext = createContext<INotificationStatus | null>(null);

export const useNotificationStatus = () => useContext(notificationStatusContext);

const NotificationStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [notificationStatus, setNotificationStatus] = useState(false);

  const changeNotificationStatus = (bool: boolean) => setNotificationStatus(bool);

  return (
    <notificationStatusContext.Provider value={{ notificationStatus, changeNotificationStatus }}>
      {children}
    </notificationStatusContext.Provider>
  );
};

export default NotificationStatusProvider;
