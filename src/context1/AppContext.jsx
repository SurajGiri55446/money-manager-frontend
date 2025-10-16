// src/context1/AppContext.js

import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

// 2. Create provider
export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const clearUser = () => {
    setUser(null);
  };

  const contextValue = {
    user,
    setUser,
    clearUser,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
