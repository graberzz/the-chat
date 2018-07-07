import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'MESSAGES_GET_SUCCESS':
      return action.messages ? Object.keys(action.messages).reduce((acc, key) => {
        acc[key] = {
          ...action.messages[key],
          id: key,
        };

        return acc;
      }, {}) : {};

    case 'MESSAGE_RECEIVE':
      return {
        ...state,
        [action.message.id]: action.message,
      };

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case 'MESSAGES_GET_SUCCESS':
      return action.messages ? Object.keys(action.messages) : state;

    case 'MESSAGE_RECEIVE':
      return [
        ...state,
        action.message.id,
      ];

    default:
      return state;
  }
};

const meta = (state = {
  fetching: false,
}, action) => {
  switch (action.type) {
    case 'MESSAGES_GET_REQUEST':
      return {
        ...state,
        fetching: true,
      };

    case 'MESSAGES_GET_SUCCESS':
    case 'MESSAGES_GET_FAILURE':
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
};

// selectors
export const getMessage = (state, id) => state.byId[id];
export const getMessages = (state) => state.ids.map(id => getMessage(state, id));
export const getRoomMessages = (state, roomId) => getMessages(state).filter(msg => msg.roomId === roomId);
export const getIsFetchingMessages = (state) => state.meta.fetching;

export default combineReducers({
  byId,
  ids,
  meta,
});