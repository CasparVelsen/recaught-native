import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HiPlus, HiHome, HiUser } from 'react-icons/hi';
import ScreenReaderOnly from './ScreenRaderOnly';

export default function Navigation() {
  return (
    <Nav>
      <LinkStyled to="/">
        <ScreenReaderOnly>homepage</ScreenReaderOnly>
        <HiHome size={35} />
      </LinkStyled>
      <LinkStyled to="/formpage">
        <ScreenReaderOnly>formpage</ScreenReaderOnly>
        <HiPlus size={35} />
      </LinkStyled>
      <LinkStyled to="/profile">
        <ScreenReaderOnly>profilepage</ScreenReaderOnly>
        <HiUser size={35} />
      </LinkStyled>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  background: white;
  height: 48px;
  border-radius: 10px 10px 0 0;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const LinkStyled = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #687a48;
  width: 100%;

  &.active {
    color: #ff9c27;
  }
`;
