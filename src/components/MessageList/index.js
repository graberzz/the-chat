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

const timestampToDate = (ts) => {
  const a = new Date(ts);
  const year = a.getFullYear();
  const month = a.getMonth() + 1 > 9 ? a.getMonth() + 1 : '0' + (a.getMonth() + 1);
  const date = a.getDate() > 9 ? a.getDate() : '0' + a.getDate();
  const hour = a.getHours() > 9 ? a.getHours() : '0' + a.getHours();
  const min = a.getMinutes() > 9 ? a.getMinutes() : '0' + a.getMinutes();
  const sec = a.getSeconds() > 9 ? a.getSeconds() : '0' + a.getSeconds();
  const time = `${hour}:${min}:${sec} ${date}.${month}.${year}`;
  
  return time;
};

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
              time={timestampToDate(msg.timestamp)}
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