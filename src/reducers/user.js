const user = (state = null, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.user;

    case 'USER_LOGOUT':
      return null;

    default:
      return state;
  }
};

// selectors
export const getUser = (state) => state;

export default user;