import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <HeaderWrapper>
        <div onClick={() => navigate('/')}>언성 히어로(로고)</div>
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
  justify-content: center;
  height: 64px;
  width: 100%;
  max-width: 1000px;
  position: fixed;
`;
