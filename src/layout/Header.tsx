import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Logout } from '../auth';
import { useUserId } from '../contexts/TokenProvider';
import NotificationStatus from '../notification/NotificationStatus';
import { IUserId } from '../types/useId';
import { useToken } from '../contexts/TokenProvider';
import { Button } from '../common';
import { AiOutlineBell, AiOutlineUser } from 'react-icons/ai';

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
        <Logo
          height={64}
          src={process.env.PUBLIC_URL + '/logo.png'}
          onClick={() => navigate('/')}
          alt='로고'
        />
        <CatchImg src={process.env.PUBLIC_URL + '/Catchphrase.png'} height={50} alt='사이트 한 줄 소개' />
        <ButtonWrapper>
          {userLogin ? (
            <>
              <Logout />
              <NotificationWarpper>
                <NotificationStatus />
                <NotificationButton onClick={() => handleMovePage('notifications')}>
                  <AiOutlineBell size={30} />
                </NotificationButton>
              </NotificationWarpper>
              <UserButton onClick={() => handleMovePage('user', id)}>
                <AiOutlineUser size={30} />
              </UserButton>
            </>
          ) : (
            <>
              <Button
                text='SignUp'
                color='default'
                onClick={() => handleMovePage('signup')}
                width={6.25}
                height={2}
                style={{ border: `2px solid #ffffff`, marginRight: '0.625rem' }}
              />
              <Button
                text='Login'
                color='white'
                onClick={() => handleMovePage('login')}
                width={6.25}
                height={2}
              />
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
  height: 4.75rem;
  position: fixed;
  z-index: 1000;
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.75rem;
  width: 100%;
  max-width: 62.5rem;
  position: fixed;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 64px;
  width: auto;
  padding: 0.1875rem;
`;

const UserButton = styled.button`
  cursor: pointer;
  border-radius: 50%;
  border: none;
  padding: 6px;
  width: 2.625rem;
  height: 2.625rem;
  background-color: ${({ theme }) => theme.colors.white};
  &:hover {
    background-color: ${({ theme }) => theme.colors.grayHover};
  }
`;

const NotificationButton = styled(UserButton)`
  margin-right: 0.625rem;
`;

const NotificationWarpper = styled.div`
  position: relative;
`;

const CatchImg = styled.img`
  padding-left: 80px;
`;
