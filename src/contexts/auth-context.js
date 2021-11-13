import { createContext, useState, useContext } from "react";

const AuthContext = createContext({
  isAuth: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const login = () => setIsAuth(true);
  const logout = () => setIsAuth(false);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        login,
        logout,
      }}
    >{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);