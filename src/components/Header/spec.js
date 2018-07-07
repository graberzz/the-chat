import React from 'react';
import { shallow } from 'enzyme';
import Header from './';

describe('<Header />', () => {
  it('matches snapshot', () => {
    expect(shallow(<Header />)).toMatchSnapshot();
  })
});