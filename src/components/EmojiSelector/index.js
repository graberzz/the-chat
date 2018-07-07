import React from 'react';
import styled from 'styled-components';

const EMOJI_LIST = [...'😀😁😂😃😄😅😆😉😊😋😎😍😘😗😙😚🙂🤗🤔😐😑😶🙄😏😣😥😮🤐😯😪😫😴😌😛😜😒😓😔😕🙃🤑😲🙁😖😞😟😤😢😭😦😧😨😩😬😰😱😳😵😡😠😷🤒🤕😇🤓😈'];

const EmojiWrap = styled.div`
  position: relative;
`;

const EmojiToggle = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  font-size: 1.2em;
`;
EmojiToggle.displayName = 'EmojiToggle';

const EmojiList = styled.ul`
  position: absolute;
  right: -4px;
  bottom: 31px;
  display: flex;
  flex-wrap: wrap;
  width: 265px;
  background: #fff;
  font-size: 2em;
  user-select: none;
`;
EmojiList.displayName = 'EmojiList';

const EmojiItem = styled.li`
  cursor: pointer;
`;

class EmojiSelector extends React.Component {
  state = {
    open: false,
  }

  onToggleClick = () => this.setState({ open: !this.state.open })

  render() {
    const { open } = this.state;
    const { onEmojiClick } = this.props;
    return (
      <EmojiWrap>
        <EmojiToggle onClick={this.onToggleClick}>
          <span role='img' aria-label='toggle emoji'>😃</span>
        </EmojiToggle>
        {open && <EmojiList>
          {EMOJI_LIST.map(emoji =>
            <EmojiItem key={emoji} onClick={e => onEmojiClick(e.target.textContent)}>
              {emoji}
            </EmojiItem>)}
        </EmojiList>}
      </EmojiWrap>
    );
  }
}

export default EmojiSelector