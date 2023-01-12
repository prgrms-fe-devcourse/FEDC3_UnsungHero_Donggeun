import React, { useState, createContext, useContext } from 'react';
import useLocalStorage from '../../auth/useLocalStorage';

interface IToken {
  token: string | undefined;
  addToken: () => void;
}

const TokenContext = createContext<IToken | null>(null);

export const useToken = () => useContext(TokenContext);

const TOKEN_KEY = 'token';

const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState();

  const addToken = () => {
    const [localToken] = useLocalStorage(TOKEN_KEY, '');
    setToken(localToken);
  };

  return <TokenContext.Provider value={{ token, addToken }}>{children}</TokenContext.Provider>;
};

export default TokenProvider;
