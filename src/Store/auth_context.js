import React, { useCallback, useState } from "react";

const AuthContext = React.createContext({
  userDataState: null,
  handleSetUser: () => {},
});

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const handleSetUser = useCallback((data) => {
    setUser(data);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userDataState: user,
        handleSetUser: handleSetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
