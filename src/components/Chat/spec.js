import React from 'react';
import { shallow } from 'enzyme';
import { Chat } from './';

const testRooms = [
  {
    id: '1',
    name: 'roomone',
    creator: 'admin',
  },
  {
    id: '2',
    name: 'roomtwo',
    creator: 'admin',
  },
];

const testMsgs = [
  {
    id: '1',
    message: 'msg1',
    timestamp: 1,
    user: {
      email: '@mail',
      username: 'test',
      avatar: 'avatar'
    },
  },
  {
    id: '2',
    message: 'msg2',
    timestamp: 3,
    user: {
      email: '@mail',
      username: 'test',
      avatar: 'avatar'
    },
  },
];

const testMatch = {
  params: {
    id: '1'
  },
};

describe('<Chat />', () => {
  const mockGetRoomMessages = jest.fn();
  it('matches snapshot', () => {
    const chat = shallow(
      <Chat
        typers={[]}
        rooms={testRooms}
        match={testMatch}
        messages={testMsgs}
        getRoomMessages={mockGetRoomMessages}
      />);

    expect(mockGetRoomMessages).toHaveBeenCalled();
    expect(chat).toMatchSnapshot();
  });
});