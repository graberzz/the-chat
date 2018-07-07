import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { vars } from 'components/common';

const activeClassName = 'room-item--active';

const RoomItemWrap = styled(NavLink)`
  display: block;
  padding: 10px 15px;
  transition: all .3s;

  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }

  &.${activeClassName} {
    color: #fff;
    background-color: ${vars.mainColor};
  }
`;

const Creator = styled.div`
  color: #aaa;
  font-size: .8em;
  float: right;
`;

const RoomItem = ({ room }) => (
    <RoomItemWrap
      to={`/${room.id}`}
      activeClassName={activeClassName}
    >
      {room.name}
      <Creator>by {room.creator || 'Cthulhu'}</Creator>
    </RoomItemWrap>
);

RoomItem.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoomItem;