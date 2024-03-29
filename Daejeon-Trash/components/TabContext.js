// TabContext.js
import React, { createContext, useState, useContext } from 'react';

const TabContext = createContext();

export const useTab = () => useContext(TabContext);

export const TabProvider = ({ children }) => {
  const [title, setTitle] = useState('Home'); 

  return (
    <TabContext.Provider value={{ title, setTitle }}>
      {children}
    </TabContext.Provider>
  );
};
