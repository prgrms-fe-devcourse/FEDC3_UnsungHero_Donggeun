import useLocalStorage from './useLocalStorage';
import { useToken, useUserId } from '../contexts/TokenProvider';
import { useNavigate } from 'react-router-dom';
import { IToken } from '../types/token';
import { IUserId } from '../types/useId';

const TOKEN_KEY = 'token';
const USERID_KEY = 'userId';

const Logout = () => {
  const [, , removeValue] = useLocalStorage(TOKEN_KEY, '');
  const [, , removeUserId] = useLocalStorage(USERID_KEY, '');
  const tokenContextObj: IToken | null = useToken();
  const userIdContext: IUserId | null = useUserId();
  const navigate = useNavigate();

  const useLogout = () => {
    removeValue();
    removeUserId();
    tokenContextObj?.removeToken();
    userIdContext?.removeUserId();
    navigate('/');
  };

  return <button onClick={useLogout}>로그 아웃</button>;
};

export default Logout;
