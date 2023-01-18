import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <HeaderWrapper>
        <div onClick={() => navigate('/')}>
          <img height={64} src={process.env.PUBLIC_URL + 'logo.png'} />
        </div>
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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.75rem;
  width: 100%;
  max-width: 1000px;
  position: fixed;
`;
