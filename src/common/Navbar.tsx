import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const itemListObj = [
  {
    name: '카테고리',
    id: 1,
    movePage: '/modal',
  },
  {
    name: '검색버튼',
    id: 2,
    movePage: '/search',
  },
  {
    name: '홈버튼',
    id: 3,
    movePage: '/',
  },
  {
    name: '알람 버튼',
    id: 4,
    movePage: '/notifications',
  },
  {
    name: '메시지함',
    id: 5,
    movePage: '/message',
  },
];

const Navbar = () => {
  const navigator = useNavigate();
  const movePage = (page: string) => {
    navigator(page);
  };

  return (
    <NavContainer>
      {itemListObj.map((item) => (
        <NavContainerItem onClick={() => movePage(item.movePage)} key={item.id}>
          {item.name}
        </NavContainerItem>
      ))}
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.gray};

  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.75rem;
  padding: 0 1.875rem;
`;

const NavContainerItem = styled.span`
  cursor: pointer;
`;
