import useLocalStorage from './useLocalStorage';
import { useToken } from '../contexts/TokenProvider';
import { useNavigate } from 'react-router-dom';

const TOKEN_KEY = 'token';

interface IToken {
  token: string | undefined;
  addToken: (getToken: string) => void;
  removeToken: () => void;
}

const Logout = () => {
  const [, , removeValue] = useLocalStorage(TOKEN_KEY, '');
  const tokenContextObj: IToken | null = useToken();
  const navigate = useNavigate();

  const useLogout = () => {
    removeValue();
    tokenContextObj?.removeToken();
    navigate('/');
  };

  return <button onClick={useLogout}>로그 아웃</button>;
};

export default Logout;
