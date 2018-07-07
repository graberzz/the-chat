import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ROOMS_GET':
      return Object.keys(action.rooms).reduce((acc, key) => {
        acc[key] = {
          ...action.rooms[key],
          id: key,
        };

        return acc;
      }, {});

    case 'ROOM_ADD':
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
    case 'ROOMS_GET':
      return Object.keys(action.rooms);
    
    case 'ROOM_RECEIVE':
      return [
        ...state,
        action.room.id,
      ];

    default:
      return state;
  }
};

const meta = (state = {
  fetching: false
}, action) => {
  switch (action.type) {
    case 'ROOMS_GET_REQUEST':
      return {
        ...state,
        fetching: true,
      };

    case 'ROOMS_GET':
      return {
        ...state,
        fetching: false,
      };

    default:
      return state
  }
};

// selectors
export const getRoom = (state, id) => state.byId[id];
export const getRooms = (state) => state.ids.map(id => getRoom(state, id));
export const getIsFetchingRooms = (state) => state.meta.fetching;

export default combineReducers({
  byId,
  ids,
  meta,
});