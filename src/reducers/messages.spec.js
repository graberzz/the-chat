import messages, * as selectors from './messages';

const testMessages = {
  msgOne: {
    message: 'text1',
  },
  msgTwo: {
    message: 'text2',
  },
  msgThree: {
    message: 'text3',
  },
};

describe('messages reducer', () => {
  it('handles MESSAGES_GET_SUCCESS action', () => {
    const action = {
      type: 'MESSAGES_GET_SUCCESS',
      messages: testMessages
    };

    const expectedState = {
      byId: {
        msgOne: {
          id: 'msgOne',
          message: 'text1',
        },
        msgTwo: {
          id: 'msgTwo',
          message: 'text2',
        },
        msgThree: {
          id: 'msgThree',
          message: 'text3',
        },
      },
      ids: ['msgOne', 'msgTwo', 'msgThree'],
      meta: {
        fetching: false,
      }
    };

    expect(messages(undefined, action)).toEqual(expectedState);
  });

  it('handles MESSAGE_RECEIVE action', () => {
    const action = {
      type: 'MESSAGE_RECEIVE',
      message: {
        id: 'msgOne',
        message: 'text1',
      },
    };
    
    const expectedState = {
      byId: {
        msgOne: {
          id: 'msgOne',
          message: 'text1',
        }
      },
      ids: ['msgOne'],
      meta: {
        fetching: false,
      },
    };

    expect(messages(undefined, action)).toEqual(expectedState);
  });
});

const testState = {
  byId: {
    msgOne: {
      id: 'msgOne',
      message: 'text1',
      roomId: 1,
    },
    msgTwo: {
      id: 'msgTwo',
      message: 'text2',
      roomId: 2,
    },
  },
  ids: ['msgOne', 'msgTwo'],
  meta: {
    fetching: false,
  },
};

describe('messages selectors', () => {
  it('getMessage selector', () => {
    expect(selectors.getMessage(testState, 'msgOne')).toEqual(testState.byId.msgOne);
  });

  it('getMessages selector', () => {
    const expected = [
      {
        id: 'msgOne',
        message: 'text1',
        roomId: 1,
      },
      {
        id: 'msgTwo',
        message: 'text2',
        roomId: 2,
      },
    ];

    expect(selectors.getMessages(testState)).toEqual(expected);
  });

  it('getRoomMessages selector', () => {
    const roomId = 1;
    const expected = [{
      id: 'msgOne',
      message: 'text1',
      roomId: 1,
    }];

    expect(selectors.getRoomMessages(testState, roomId)).toEqual(expected);
  });

  it('getIsFetchingMessages selector', () => {
    expect(selectors.getIsFetchingMessages(testState)).toBe(false);
  });
});