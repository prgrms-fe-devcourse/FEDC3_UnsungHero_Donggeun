import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';

const itemListObj = [
  {
    name: <AiOutlineHome className='menuIcon' />,
    id: 1,
    movePage: '/',
  },
  {
    name: <IoMdNotificationsOutline className='menuIcon' />,
    id: 2,
    movePage: '/notifications',
  },
  {
    name: <AiOutlineMessage className='menuIcon' />,
    id: 3,
    movePage: '/message',
  },
];

interface IProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ menuOpen, setMenuOpen }: IProps) => {
  const navigator = useNavigate();
  const { channelId } = useParams();

  const movePage = (page: string) => {
    navigator(page);
  };

  return (
    <NavContainer>
      <NavContainerItem
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <GiHamburgerMenu className='menuIcon' />
      </NavContainerItem>
      <NavContainerItem>
        <FiSearch className='menuIcon' onClick={() => movePage(`/search/${channelId}`)} />
      </NavContainerItem>
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
  display: none;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.contentLine};
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.75rem;
  padding: 0 1.875rem;
  z-index: 300;
  @media (max-width: ${({ theme }) => theme.media.moblie}) {
    display: flex;
  }
`;

const NavContainerItem = styled.span`
  cursor: pointer;
  .menuIcon {
    height: 24px;
    width: 24px;
  }
`;
