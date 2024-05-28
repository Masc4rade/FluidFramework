import React, { createContext, useState, ReactNode } from 'react';

interface UserContextProps {
  user: Record<string, unknown>;
  setUser: (user: Record<string, unknown>) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
const defaultUserContext: UserContextProps = {
    user: {},
    setUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {}
  };
  

export const UserContext = createContext<UserContextProps>(defaultUserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Record<string, unknown>>({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};