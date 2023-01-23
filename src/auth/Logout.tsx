import useLocalStorage from '../hooks/useLocalStorage';
import { useToken, useUserId } from '../contexts/TokenProvider';
import { useNavigate } from 'react-router-dom';
import { IToken } from '../types/token';
import { IUserId } from '../types/useId';
import styled from 'styled-components';

const TOKEN_KEY = 'token';
const USERID_KEY = 'userId';

const Logout = () => {
  const [, , removeValue] = useLocalStorage(TOKEN_KEY, '');
  const [, , removeUserId] = useLocalStorage(USERID_KEY, '');
  const tokenContextObj: IToken | null = useToken();
  const userIdContext: IUserId | null = useUserId();
  const navigate = useNavigate();

  const processLogout = () => {
    removeValue();
    removeUserId();
    tokenContextObj?.removeToken();
    userIdContext?.removeUserId();
    navigate('/');
  };

  return <Button onClick={processLogout}>Logout</Button>;
};

export default Logout;

export const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin-right: 0.625rem;
  border-radius: 0.3125rem;
  padding: 0.3125rem 0.625rem;
  height: 1.875rem;
  transition: all 0.2s ease;
  font-weight: bold;
  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
