import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useToken } from '../contexts/TokenProvider';

const itemListObj = [
  {
    name: 'category',
    tag: <GiHamburgerMenu className='menuIcon' />,
    id: 1,
  },
  {
    name: 'search',
    tag: <FiSearch className='menuIcon' />,
    id: 2,
  },
  {
    name: 'home',
    tag: <AiOutlineHome className='menuIcon' />,
    id: 3,
    movePage: '/',
  },
  {
    name: 'notification',
    tag: <IoMdNotificationsOutline className='menuIcon' />,
    id: 4,
    movePage: '/notifications',
  },
  {
    name: 'message',
    tag: <AiOutlineMessage className='menuIcon' />,
    id: 5,
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
  const userToken = useToken()?.token;

  const handlemovePage = (name: string, id: string | undefined) => {
    switch (name) {
      case 'category':
        setMenuOpen(!menuOpen);
        break;
      case 'search':
        navigator(`/search/${id}`);
        break;
      case 'home':
        navigator('/');
        break;
      case 'notification':
        userToken ? navigator('/notifications') : navigator('/login');
        break;
      case 'message':
        userToken ? navigator('/message') : navigator('/login');
    }
  };

  return (
    <NavContainer>
      {itemListObj.map((item) => (
        <NavContainerItem onClick={() => handlemovePage(item.name, channelId)} key={item.id}>
          {item.tag}
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
  width: 100vw;
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
