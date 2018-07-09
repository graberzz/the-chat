import { combineReducers } from 'redux';
import user, * as fromUser  from './user';
import rooms, * as fromRooms from './rooms';
import messages, * as fromMessages from './messages';
import typers, * as fromTypers from './typers';

// selectors
export const getUser = (state) => fromUser.getUser(state.user);
export const getRooms = (state) => fromRooms.getRooms(state.rooms);
export const getIsFetchingMessages = (state) => fromMessages.getIsFetchingMessages(state.messages);
export const getRoomMessages = (state, roomId) => fromMessages.getRoomMessages(state.messages, roomId);
export const getRoomTypers = (state, roomId) => fromTypers.getRoomTypers(state.typers, roomId);

export default combineReducers({
  user,
  rooms,
  messages,
  typers,
});