import * as actions from './';

describe('actions', () => {
  it('ROOM_RECEIVE action', () => {
    const room = {
      name: 'test',
    };

    expect(actions.recieveRoom(room)).toEqual({
      type: 'ROOM_RECEIVE',
      room,
    });
  });

  it('MESSAGE_RECEIVE action', () => {
    const message = {
      timestamp: 1982812,
    };

    expect(actions.recieveMessage(message)).toEqual({
      type: 'MESSAGE_RECEIVE',
      message,
    });
  });

  it('TYPERS_UPDATE action', () => {
    const typers = [1, 2, 3];

    expect(actions.updateTypers(typers)).toEqual({
      type: 'TYPERS_UPDATE',
      typers,
    });
  });
});