const typers = (state = {}, action) => {
  switch (action.type) {
    case 'TYPERS_UPDATE':
      return action.typers ?
        Object.keys(action.typers).reduce((acc, val) => {
          acc[val] = Object.keys(action.typers[val]);
          return acc;
        }, {}) : {};

    default:
      return state;
  }
};

// selectors
export const getRoomTypers = (state, roomId) => state[roomId] || [];

export default typers;