import React from 'react';
import PropTypes from 'prop-types';

import RoomItem from './RoomItem/';

const RoomList = ({ rooms }) => (
  <ul>
      { rooms.map(room => 
        <RoomItem key={room.id} room={room} />)}
  </ul>
);

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
};

export default RoomList;