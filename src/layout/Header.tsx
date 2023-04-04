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
  const handleClickMovePage = (page: string, id?: string | null) => {
    id ? navigate(`/${page}/${id}`) : navigate(`/${page}`);
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <Logo
          height={64}
          src={process.env.PUBLIC_URL + '/logo.svg'}
          onClick={() => navigate('/')}
          alt='로고'
        />
        <CatchImg src={process.env.PUBLIC_URL + '/Catchphrase.png'} height={50} alt='사이트 한 줄 소개' />
        <ButtonWrapper>
          {userLogin ? (
            <>
              <LogOutWrapper>
                <Logout />
              </LogOutWrapper>
              <NotificationWarpper>
                <NotificationStatus />
                <NotificationButton onClick={() => handleClickMovePage('notifications')}>
                  <AiOutlineBell size={30} />
                </NotificationButton>
              </NotificationWarpper>
              <UserButton onClick={() => handleClickMovePage('user', id)}>
                <AiOutlineUser size={30} />
              </UserButton>
            </>
          ) : (
            <>
              <Button
                text='SignUp'
                color='default'
                onClick={() => handleClickMovePage('signup')}
                width={6.25}
                height={2}
                className='button'
                style={{ border: `2px solid #ffffff`, marginRight: '0.625rem' }}
              />
              <Button
                text='Login'
                color='white'
                onClick={() => handleClickMovePage('login')}
                width={6.25}
                height={2}
                className='button'
              />
              <UserButton className='mobileUserBtn' onClick={() => handleClickMovePage('login')}>
                <AiOutlineUser size={30} />
              </UserButton>
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
  top: 0;
  z-index: 1000;
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.75rem;
  width: 100vw;
  max-width: 62.5rem;
  position: fixed;
  top: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  .mobileUserBtn {
    display: none;
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      display: block;
    }
  }
  .button {
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      display: none;
    }
  }
`;

const Logo = styled.img`
  cursor: pointer;
  height: 4rem;
  width: auto;
  padding: 0.1875rem;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    height: 3.5rem;
  }
`;

const UserButton = styled.button`
  cursor: pointer;
  border-radius: 50%;
  border: none;
  padding: 0.375rem;
  width: 2.625rem;
  height: 2.625rem;
  background-color: ${({ theme }) => theme.colors.white};
  &:hover {
    background-color: ${({ theme }) => theme.colors.grayHover};
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-right: 0.625rem;
  }
`;

const NotificationButton = styled(UserButton)`
  margin-right: 0.625rem;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: none;
  }
`;

const NotificationWarpper = styled.div`
  position: relative;
`;

const CatchImg = styled.img`
  padding-left: 5rem;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: none;
  }
`;

const LogOutWrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: none;
  }
`;
