import React from 'react';
import { shallow } from 'enzyme';
import RoomItem from './';

describe('<RoomItem />', () => {
  it('matches snapshot', () => {
    const room = {
      id: 'id',
      name: 'test room',
      creator: 'tester',
    };

    expect(shallow(<RoomItem room={room} />)).toMatchSnapshot();
  });
});