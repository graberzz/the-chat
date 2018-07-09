import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ROOM_RECEIVE':
      return {
        ...state,
        [action.room.id]: action.room,
      };
    
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case 'ROOM_RECEIVE':
      return [
        ...state,
        action.room.id,
      ];

    default:
      return state;
  }
};


// selectors
export const getRoom = (state, id) => state.byId[id];
export const getRooms = (state) => state.ids.map(id => getRoom(state, id));

export default combineReducers({
  byId,
  ids,
});