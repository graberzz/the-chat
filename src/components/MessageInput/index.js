import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

import EmojiSelector from '../EmojiSelector';
import * as selectors from 'reducers';

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
TextArea.displayName = 'TextArea';

const EmojiWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export class MessageInput extends React.Component {
  state = {
    text: '',
  }
  
  constructor(props) {
    super(props);

    this.throttledSetTyping = throttle(props.api.setTyping, 1000);
  }

  componentWillUnmount() {
    const { api, user, roomId } = this.props;

    if (!user) return;
    api.unsetTyping(user.username, roomId);
  }


  onKeyDown = (e) => {
    const { api, user, roomId } = this.props;
    const { text } = this.state;

    if (e.key === 'Enter' && !e.shiftKey && text.trim() !== '') {
      api.sendMessage(user, text, roomId);
      this.setState({
        text: '',
      });
      e.preventDefault();
    } else if (text.trim() !== '') {
      this.throttledSetTyping(user.username, roomId, 4000);
    }
  }

  onTextChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  }

  onEmojiClick = (emoji) => {
    if (!this.props.user) return;

    const { selectionStart, selectionEnd } = this.textarea;
    const { text } = this.state;
    const textArr = text.split('');
    textArr.splice(selectionStart, 0, emoji);
    
    this.setState({
      text: textArr.join('')
    }, () => {
      this.textarea.focus();
      this.textarea.setSelectionRange(selectionStart + 2, selectionEnd + 2);
    });
  }

  render() {
    const { text } = this.state;
    const { user } = this.props;

    return (
      <Wrapper>
        <TextArea
          value={text}
          onChange={this.onTextChange}
          innerRef={ref => this.textarea = ref}
          placeholder={user ? 'Type your message...' : "You haven't logged in"}
          disabled={user === null}
          onKeyDown={this.onKeyDown}
        />
        <EmojiWrapper>
          <EmojiSelector onEmojiClick={this.onEmojiClick} />
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
  api: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: selectors.getUser(state),
});

export default connect(mapStateToProps)(MessageInput);