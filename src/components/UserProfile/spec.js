import React from 'react';
import { shallow } from 'enzyme'; 
import { UserProfile, ButtonFlex } from './';

describe('<UserProfile />', () => {
  let userProfile;
  
  const renderUserProfile = ({ login = f => f, logout = f => f, user = null } = {}) =>
    shallow(<UserProfile
      login={login}
      logout={logout}
      user={user}
    />);

  it('matches logged in snapshot', () => {
    userProfile = renderUserProfile();
    expect(userProfile).toMatchSnapshot();
  });

  it('matches logged out snapshot', () => {
    userProfile = renderUserProfile({
      user: {
        username: 'user',
        avatar: 'hhtps',
      },
    });
    expect(userProfile).toMatchSnapshot();
  });

  it('fires login', () => {
    const mockLogin = jest.fn();

    userProfile = renderUserProfile({ login: mockLogin });
    userProfile.find('ButtonFlex').simulate('click');
    expect(mockLogin).toBeCalled();
  });

  it('fires logout', () => {
    const mockLogout = jest.fn();
    const user = {
      username: 'user',
      avatar: 'link',
    };

    userProfile = renderUserProfile({
      logout: mockLogout,
      user: {
        username: 'user',
        avatar: 'url',
      },
    });
    userProfile.find('ButtonFlex').simulate('click');
    expect(mockLogout).toBeCalled();
  });
})