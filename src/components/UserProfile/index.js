import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ButtonReversed as Button } from 'components/common';
import * as api from 'api';
import * as selectors from 'reducers';

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ButtonFlex = Button.extend`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
ButtonFlex.displayName = 'ButtonFlex';

export const UserProfile = ({
  user,
  login = api.login,
  logout = api.logout }) => {
  if (user)
    return (
      <ButtonFlex onClick={logout}>
        <Image
          src={user.avatar}
          alt={user.username}
        />
        Logout
      </ButtonFlex>
    );

  return (
    <ButtonFlex onClick={login}>
      <Image
        src='/google.png'
        alt='Google'
      />
      Login
    </ButtonFlex>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
}

const mapStateToProps = (state) => ({
  user: selectors.getUser(state),
});

export default connect(mapStateToProps)(UserProfile);