"use client";

import { PropsWithChildren, createContext, useContext } from "react";
import { User } from "./type";

const UserContext = createContext({
  userInfo: {} as User,
});

export const useUserContext = () => useContext(UserContext);

interface UserProviderProps {
  userInfo: User;
}

export const UserProvider: React.FC<PropsWithChildren<UserProviderProps>> = ({
  children,
  userInfo,
}) => {
  return (
    <UserContext.Provider value={{ userInfo }}>{children}</UserContext.Provider>
  );
};
