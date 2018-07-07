import * as api from '../api';

export const recieveRoom = (room) => ({
  type: 'ROOM_RECEIVE',
  room,
});

export const recieveMessage = (message) => ({
  type: 'MESSAGE_RECEIVE',
  message,
});

export const updateTypers = (typers) => ({
  type: 'TYPERS_UPDATE',
  typers,
});

// Thunks

export const getRoomMessages = (roomId) => (dispatch) => {
  dispatch({
    type: 'MESSAGES_GET_REQUEST',
  });

  api.getRoomMessages(roomId).then((messages) => {
    dispatch({
      type: 'MESSAGES_GET_SUCCESS',
      roomId,
      messages,
    });
  })
};