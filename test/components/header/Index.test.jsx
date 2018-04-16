import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../../src/components/header';
import Title from '../../../src/components/header/Title';
import CartTeaser from '../../../src/components/header/CartTeaser';


configure({ adapter: new Adapter() });

describe('Header component', () => {
  it('should render the title and cart teaser component', () => {
    const header = shallow(<Header/>);
    expect(header.find(Title).getElements().length).toEqual(1);
    expect(header.find(CartTeaser).getElements().length).toEqual(1);
  });
});