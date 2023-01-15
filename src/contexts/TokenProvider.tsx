import React, { useState, createContext, useContext } from 'react';
import useLocalStorage from '../auth/useLocalStorage';
import { IToken } from '../types/token';
import { IUserId } from '../types/useId';

const TokenContext = createContext<IToken | null>(null);
const UserIdContext = createContext<IUserId | null>(null);

export const useToken = () => useContext(TokenContext);
export const useUserId = () => useContext(UserIdContext);

const TOKEN_KEY = 'token';
const USERID_KEY = 'userId';

const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [localToken] = useLocalStorage(TOKEN_KEY, '');
  const [localUserId] = useLocalStorage(USERID_KEY, '');
  const [token, setToken] = useState(localToken);
  const [userId, setUserId] = useState(localUserId);

  const addToken = (getToken: string) => setToken(getToken);
  const removeToken = () => setToken(null);

  const addUserId = (id: string) => setUserId(id);
  const removeUserId = () => setUserId(null);

  return (
    <TokenContext.Provider value={{ token, addToken, removeToken }}>
      <UserIdContext.Provider value={{ userId, addUserId, removeUserId }}>{children}</UserIdContext.Provider>
    </TokenContext.Provider>
  );
};

export default TokenProvider;
