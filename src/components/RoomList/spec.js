import React from 'react';
import { shallow } from 'enzyme';
import RoomList from './';

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

describe('<RoomList />', () => {
  it('matches snapshot', () => {
    expect(shallow(<RoomList rooms={testRooms} />)).toMatchSnapshot();
  });
});