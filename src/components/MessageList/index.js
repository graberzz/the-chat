import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Message from '../Message';

const MessageListWrap = styled.ul`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;

class MessageList extends React.Component {  
  componentDidMount() {
    this.wrap.scrollTo(0, this.wrap.scrollHeight);
  }
  
  componentDidUpdate() {
    this.wrap.scrollTo(0, this.wrap.scrollHeight);
  }
  
  render() {
    const { messages, user } = this.props;

    return (
      <MessageListWrap innerRef={ref => this.wrap = ref}>
        <CSSTransitionGroup
          transitionName='slidein'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {messages.map((msg) =>
            <Message
              key={msg.id}
              own={user && msg.user.email === user.email}
              avatar={msg.user.avatar}
              username={msg.user.username}
              message={msg.message}
              time={new Date(msg.timestamp).toLocaleString('ru-RU')}
            />
          )}
        </CSSTransitionGroup>
      </MessageListWrap>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
  })).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

export default MessageList;