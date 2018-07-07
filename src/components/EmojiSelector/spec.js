import React from 'react';
import { shallow, mount } from 'enzyme';
import EmojiSelector from './';

describe('<EmojiSelector />', () => {
  let ES;

  beforeEach(() => {
    ES = shallow(<EmojiSelector />);
  });

  afterEach(() => {
    ES = undefined;
  });
  
  it('matches snapshot', () => {
    expect(ES).toMatchSnapshot();
  });

  it('does not render EmojiList initially', () => {    
    expect(ES.find('EmojiList')).toHaveLength(0);
    expect(ES.state().open).toBe(false);
  });


  it('toggle click renders EmojiList', () => {    
    ES.find('EmojiToggle').simulate('click');

    expect(ES.find('EmojiList')).toHaveLength(1);
    expect(ES.state().open).toBe(true);
  });

  it('onEmojiClick returns valid emoji', () => {
    const fn = jest.fn();
    ES = mount(<EmojiSelector onEmojiClick={fn}/>);
    ES.find('EmojiToggle').simulate('click');
    
    const firstEmoji = ES.find('li').at(0); 
    
    firstEmoji.simulate('click');

    expect(fn.mock.calls[0][0]).toBe(firstEmoji.text());
  });
});