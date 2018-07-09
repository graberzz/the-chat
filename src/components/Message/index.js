import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { vars } from 'components/common';

const MessageWrap = styled.li`
  position: relative;
  margin-bottom: 5px;
  margin-left: 20px;
  padding: 10px 20px;
  white-space: pre-line;
  float: left;
  clear: both;
  background-color: #e3fcff;

  &.slidein-enter {
    transform: translateX(500%);
  }
  
  &.slidein-enter-active {
    transform: translateX(0%);
    transition: all .5s;
  }
  
  &.slidein-leave {
    transform: translateX(0%);
  }
  
  &.slidein-leave-active {
    transform: translateX(500%);
    transition: all 0.5s;
  }

  &::before {
    content: '';
    height: 0;
    border-style: solid;
    position: absolute;
    top: 0;
    left: -20px;
    width: 0;
    border-width: 0 20px 20px 0;
    border-color: transparent #e3fcff transparent transparent;
  }
`;
MessageWrap.displayName = 'MessageWrap';

const OwnMessageWrap = MessageWrap.extend`
  margin-left: 0;
  margin-right: 20px;
  float: right;
  background-color: #fff;
  
  &::before {
    left: auto;
    right: -20px;
    border-width: 20px 20px 0 0;
    border-color: #fff transparent transparent transparent;
  }
`;
OwnMessageWrap.displayName = 'OwnMessageWrap';

const MessageHeading = styled.div`
  display: flex;
  flex-direction: ${(({ own }) => own ? 'row-reversed' : 'row')};
  align-items: center;
`;

const Username = styled.div`
  margin-right: 15px;
  color: ${vars.mainColor};
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

const MessageFooter = styled.div`
  margin-top: 5px;
  font-size: .8em;
  color: #aaa;
  text-align: right;
`;

const Message = ({ username, message, avatar, time, own }) => {
  const Wrapper = own ? OwnMessageWrap : MessageWrap;

  return (
    <Wrapper>
      <MessageHeading>
        <Username>{username}</Username>
        <Avatar
          own={own}
          src={avatar}
          alt={username}
        />
      </MessageHeading>
      {message}
      <MessageFooter>
        {time}
      </MessageFooter>
    </Wrapper>
  );
}

Message.proopTypes = {
  username: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  own: PropTypes.bool.isRequired,
};

export default Message;