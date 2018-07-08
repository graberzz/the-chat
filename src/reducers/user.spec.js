import user, * as selectors from './user';

describe('user reducer', () => {
  const testUser = {
    username: 'test',
    avatar: 'testavatar',
    email: 'test@test.com',
  };

  it('handles login action', () => {
    const action = {
      type: 'USER_LOGIN',
      testUser,
    };

    const state = user(undefined, action);

    expect(state).toEqual(action.user);
  });

  it('handles logout action', () => {
    const action = {
      type: 'USER_LOGOUT',
    };

    const state = user(testUser, action);

    expect(state).toBe(null);
  });
});

describe('user selectors', () => {
  it('getUser selector', () => {
    const state = {
      username: 'test',
      avatar: 'avatar',
      email: 'e@mail.com',
    };
    
    expect(selectors.getUser(state)).toEqual(state);
  });
});