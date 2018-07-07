import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

import EmojiSelector from './EmojiSelector';
import * as selectors from '../reducers';
import * as api from '../api';

const Wrapper = styled.div`
  position: relative;
`;

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  height: 80px;
  padding: 10px;
  padding-right: 30px;
  border: none;
  background-color: #fff;
  resize: none;
  outline: none;
`;

const EmojiWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const throttledSetTyping = throttle(api.setTyping, 1000);

class MessageInput extends React.Component {
  componentWillUnmount() {
    const { user, roomId } = this.props;

    if (!user) return;
    api.unsetTyping(user.username, roomId);
  }


  onKeyDown = (e) => {
    const { user, roomId } = this.props;

    if (e.key === 'Enter' && !e.shiftKey && this.input.value.trim() !== '') {
      api.sendMessage(user, this.input.value, roomId);
      this.input.value = '';
      e.preventDefault();
    } else if (this.input.value.trim() !== '') {
      throttledSetTyping(user.username, roomId, 4000);
    }
  }

  render() {
    const { user } = this.props;

    return (
      <Wrapper>
        <TextArea
          innerRef={ref => this.input = ref}
          placeholder={user ? 'Type your message...' : "You haven't logged in"}
          disabled={user === null}
          onKeyDown={this.onKeyDown}
        />
        <EmojiWrapper>
          <EmojiSelector onEmojiClick={emoji => {
            if (!user) return;
            const { selectionStart, value } = this.input;
            console.log(value.split('').splice(selectionStart, 0, emoji).join(''));
            const textArr = value.split('');
            textArr.splice(selectionStart, 0, emoji);
            this.input.value = textArr.join('');
          }} />
        </EmojiWrapper>

      </Wrapper>
    )
  }
}

MessageInput.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  roomId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: selectors.getUser(state),
});

export default connect(mapStateToProps)(MessageInput);