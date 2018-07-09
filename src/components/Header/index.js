import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserProfile from 'components/UserProfile';
import { vars, Container } from 'components/common';

const HeaderWrap = styled.div`
  margin-bottom: 10px;
  height: 70px;
  color: #fff;
  background-color: ${vars.mainColor};
  box-shadow: ${vars.boxShadow};
`;

const SContainer = Container.extend`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Logo = styled.div`
  font-size: 3rem;
`;

const Header = () => (
  <HeaderWrap>
    <SContainer>
      <Link to='/'>
        <Logo>theCHAT</Logo>
      </Link>
      <UserProfile />
    </SContainer>
  </HeaderWrap>
);

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
};

export default Header;