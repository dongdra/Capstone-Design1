//NotificationContext.js.
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  return (
    <NotificationContext.Provider value={{ notificationEnabled, setNotificationEnabled }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
