import React, { useState, createContext, useContext } from 'react';
import useLocalStorage from '../auth/useLocalStorage';

interface IToken {
  token: string | undefined;
  addToken: (getToken: string) => void;
}

const TokenContext = createContext<IToken | null>(null);

export const useToken = () => useContext(TokenContext);

const TOKEN_KEY = 'token';

const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [localToken] = useLocalStorage(TOKEN_KEY, '');
  const [token, setToken] = useState(localToken);

  const addToken = (getToken: string) => setToken(getToken);

  return <TokenContext.Provider value={{ token, addToken }}>{children}</TokenContext.Provider>;
};

export default TokenProvider;
