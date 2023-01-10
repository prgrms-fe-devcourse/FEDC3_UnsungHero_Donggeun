import useLocalStorage from './useLocalStorage';

const TOKEN_KEY = 'token';

const Logout = () => {
  const [, , removeValue] = useLocalStorage(TOKEN_KEY, '');

  return <button onClick={removeValue}>로그아웃</button>;
};

export default Logout;
