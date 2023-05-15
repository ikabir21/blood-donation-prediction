import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  return (
    <MyContext.Provider
      value={{
        isLogin,
        login,
        logout,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
