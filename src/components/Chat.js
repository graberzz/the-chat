import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Preloader from './Preloader';
import { NoRoomSelected } from './common';
import { getRoomMessages } from 'actions';
import * as api from 'api';
import * as selectors from 'reducers';

const Bottom = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-left: 1px solid #eee;
`;

const TypersWrap = styled.div`
  padding-right: 10px;
  text-align: right;
  color: #aaa;
  font-size: .8em;
`;

class Chat extends React.Component {
  componentDidMount() {
    this.props.getRoomMessages(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getRoomMessages(this.props.match.params.id);
    }
  }

  render() {
    const { match, user, messages, typers, rooms, fetchingMessages } = this.props;

    if (fetchingMessages) {
      return <Preloader />
    }

    const typersFiltered = user ? typers.filter(typer => typer !== user.username) : typers;

    if (!rooms.map(room => room.id).includes(match.params.id)) {
      return (
        <NoRoomSelected>Select Room</NoRoomSelected>
      );
    }

    return (
      <React.Fragment>
        <MessageList
          messages={messages}
          user={user}
        />
        <Bottom>
          {typersFiltered.length > 0 &&
            <TypersWrap>
              {typersFiltered.join(', ')} typing...
            </TypersWrap>}
          <MessageInput
            api={api}
            roomId={match.params.id}
          />
        </Bottom>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  user: selectors.getUser(state),
  messages: selectors.getRoomMessages(state, ownProps.match.params.id),
  typers: selectors.getRoomTypers(state, ownProps.match.params.id),
  rooms: selectors.getRooms(state),
  fetchingMessages: selectors.getIsFetchingMessages(state),
});

const mapDispatchToProps = {
  getRoomMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);