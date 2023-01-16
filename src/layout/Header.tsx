import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUserId } from '../contexts/TokenProvider';
import NotificationStatus from '../notification/NotificationStatus';
import { IUserId } from '../types/useId';
import { useToken } from '../contexts/TokenProvider';
import { Logout } from '../auth';

const Header = () => {
  const tokenObject = useToken();
  const userLogin = tokenObject?.token;

  const userIdContext: IUserId | null = useUserId();
  const id = userIdContext?.userId;
  const navigate = useNavigate();
  const handleMovePage = (page: string, id?: string | null) => {
    id ? navigate(`/${page}/${id}`) : navigate(`/${page}`);
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <div onClick={() => navigate('/')}>언성 히어로(로고)</div>
        <ButtonWrapper>
          {userLogin ? (
            <>
              <NotificationStatus />
              <button onClick={() => handleMovePage('notifications')}>알림</button>
              <button onClick={() => handleMovePage('user', id)}>사용자</button>
              <Logout />
            </>
          ) : (
            <>
              <button onClick={() => handleMovePage('signup')}>회원가입</button>
              <button onClick={() => handleMovePage('login')}>로그인</button>
            </>
          )}
        </ButtonWrapper>
      </HeaderWrapper>
    </Wrapper>
  );
};
export default Header;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  width: 100%;
  height: 64px;
  position: fixed;
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  width: 100%;
  max-width: 1000px;
  position: fixed;
`;

const ButtonWrapper = styled.div``;
