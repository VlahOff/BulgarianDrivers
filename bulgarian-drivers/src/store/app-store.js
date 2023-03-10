import React from 'react';

const AppContext = React.createContext({});

export const AppContextProvider = (props) => {
  return <AppContext.Provider
    value={{}}
  >
    {props.children}
  </AppContext.Provider>;
};

export default AppContext;