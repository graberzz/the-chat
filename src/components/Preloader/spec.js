import React from 'react';
import Preloader from './';
import { shallow } from 'enzyme';

describe('<Preloader />', () => {
  it('matches snapshot', () => {
    const preloader = shallow(<Preloader />);

    expect(preloader).toMatchSnapshot();
  })
})