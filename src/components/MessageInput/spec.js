import React from 'react';
import { shallow, mount } from 'enzyme';
import { MessageInput } from './';
import * as api from 'api';

describe('<MessageInput />', () => {
  it('matches snapshot', () => {
    const messageInput = shallow(
      <MessageInput
        api={api}
        roomId='1'
      />
    );

    expect(messageInput).toMatchSnapshot();
  });

  it('matches snapshot with logged in user', () => {
    const user = {
      username: 'user',
      avatar: 'avatar',
      email: 'e@mail.com',
    };

    const messageInput = shallow(
      <MessageInput
        api={api}
        roomId='1'
        user={user}
      />
    );

    expect(messageInput).toMatchSnapshot();
  });

  it('onEmojiClick adds emoji to the textbox', () => {
    const user = {
      username: 'user',
      avatar: 'avatar',
      email: 'e@mail.com',
    };

    const messageInput = mount(
      <MessageInput
        api={api}
        roomId='1'
        user={user}
      />
    );

    messageInput.instance().onEmojiClick('emoji');
    expect(messageInput.state().text).toBe('emoji');
  });
});