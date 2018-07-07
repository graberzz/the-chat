import React from 'react';
import { shallow } from 'enzyme';
import Message from './';

describe('<Message />', () => {
  const props = {
    username: 'tester',
    message: 'hey',
    avatar: 'test-avatar',
    own: false,
  };

  it('matches snapshot', () => {
    expect(shallow(<Message {...props} />)).toMatchSnapshot();
  });

  it('matches snapshot[own]', () => {
    expect(shallow(<Message {...props} own={true} />)).toMatchSnapshot();
  });
});