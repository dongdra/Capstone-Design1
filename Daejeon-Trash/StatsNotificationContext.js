//StatsNotificationContext.js
import React, { createContext, useContext, useState } from 'react';

const StatsNotificationContext = createContext();

export const StatsNotificationProvider = ({ children }) => {
  const [statsNotificationEnabled, setStatsNotificationEnabled] = useState(false);

  return (
    <StatsNotificationContext.Provider value={{ statsNotificationEnabled, setStatsNotificationEnabled }}>
      {children}
    </StatsNotificationContext.Provider>
  );
};

export const useStatsNotification = () => useContext(StatsNotificationContext);
