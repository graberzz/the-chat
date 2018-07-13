import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RoomItem from '../RoomItem';

const NoRooms = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 2em;
`;

const RoomList = ({ rooms }) => (
  <ul>
      { rooms.length ? rooms.map(room => 
        <RoomItem key={room.id} room={room} />) :
        <NoRooms>no rooms yet...</NoRooms> }
  </ul>
);

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default RoomList;