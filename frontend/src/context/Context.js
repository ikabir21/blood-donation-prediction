import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("isLogin") || true);

  const login = () => {
    setIsLogin(true)
    localStorage.setItem("isLogin", true)
  };
  const logout = () => {
    setIsLogin(false);
    localStorage.setItem("isLogin", false)
  }

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
