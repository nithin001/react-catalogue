import React from 'react';
import Title from './Title';
import CartTeaser from './CartTeaser';
const Header = props => (
  <div className={'header'}>
    <Title/>
    <CartTeaser/>
  </div>);

export default Header;
