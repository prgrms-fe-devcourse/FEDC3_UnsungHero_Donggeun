import { useNavigate } from 'react-router-dom';
import * as L from './layout';

const Header = () => {
  const userLogin = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleMovePage = (page: string, id?: string) => {
    id ? navigate(`/${page}/${id}`) : navigate(`/${page}`);
  };

  return (
    <>
      <L.HeaderWrapper>
        <div>언성 히어로(로고)</div>
        <div>검색창</div>
        <L.ButtonWrapper>
          {userLogin ? (
            <>
              <button onClick={() => handleMovePage('notifications')}>알림</button>
              <button onClick={() => handleMovePage('user')}>사용자</button>
            </>
          ) : (
            <>
              <button onClick={() => handleMovePage('signup')}>회원가입</button>
              <button onClick={() => handleMovePage('login')}>로그인</button>
            </>
          )}
        </L.ButtonWrapper>
      </L.HeaderWrapper>
    </>
  );
};
export default Header;
