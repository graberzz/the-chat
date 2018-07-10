import React from 'react';
import { render } from 'enzyme';
import MessageList from './';

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

describe('<MessageList />', () => {
  it('matches snapshot', () => {
    expect(render(<MessageList messages={testMsgs} timestampToDate={ts => ts} />)).toMatchSnapshot();
  });
});