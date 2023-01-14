import React, { useState, createContext, useContext } from 'react';
import useLocalStorage from '../auth/useLocalStorage';
import { IToken } from '../types/token';

const TokenContext = createContext<IToken | null>(null);

export const useToken = () => useContext(TokenContext);

const TOKEN_KEY = 'token';

const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [localToken] = useLocalStorage(TOKEN_KEY, '');

  const [checkTokenCertification, setCheckTokenCertification] = useState<boolean>(false);
  const [token, setToken] = useState(localToken);

  const addToken = (getToken: string) => {
    setToken(getToken);
    setCheckTokenCertification(true);
  };
  const removeToken = () => setToken('');

  return (
    <TokenContext.Provider
      value={{ token: checkTokenCertification ? token : undefined, addToken, removeToken }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
