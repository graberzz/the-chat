import rooms, * as selectors from './rooms';

const testRoom = {
  id: 'roomOne',
  name: 'room1',
  creator: 'admin',
};

describe('rooms reducer', () => {

  it('handles ROOM_RECEIVE action', () => {
    const action = {
      type: 'ROOM_RECEIVE',
      room: testRoom,
    };

    const expectedState = {
      byId: {
        roomOne: {
          id: 'roomOne',
          name: 'room1',
          creator: 'admin',
        },
      },
      ids: ['roomOne'],
    };

    expect(rooms(undefined, action)).toEqual(expectedState);
  });
});

describe('rooms selectors', () => {
  it('getRoom selector', () => {
    const state = {
      byId: {
        roomOne: testRoom,
      },
    };

    expect(selectors.getRoom(state, 'roomOne')).toEqual(testRoom);
  });

  it('getRooms selector', () => {
    const state = {
      byId: {
        roomOne: testRoom,
        roomTwo: testRoom,
      },
      ids: ['roomOne', 'roomTwo'],
    };

    expect(selectors.getRooms(state)).toEqual([state.byId.roomOne, state.byId.roomTwo]);
  });
});