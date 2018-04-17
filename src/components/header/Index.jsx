import React from 'react';
import { connect } from 'react-redux';

import Title from './Title';
import CartTeaser from './CartTeaser';
import { load as loadCart } from '../../actions/cart';
import { load as loadQuote } from '../../actions/quote';
export class Header extends React.Component {
  constructor (props) {
    super(props);
    if (!this.props.cartLoaded) {
      this.props.loadCart();
    }
  }

  componentDidUpdate () {
    const cartItems = [];
    this.props.cart.forEach((value, key) => {
        cartItems.push(key);
      }
    );
    const cart = cartItems.map(item => ({
      sku: item,
      quantity: this.props.cart.get(item)
    }));
    this.props.loadQuote(cart);
  }

  render () {
    return (<div className={'navbar-fixed'}>
      <nav >
        <div className={'nav-wrapper'}>
          <Title/>
          <CartTeaser/>
        </div>
      </nav>
    </div>);
  }
}

export const mapStateToProps = (state) => {
  const cartLoaded = state.ui.get('cart_loaded_from_server');
  return { cartLoaded, cart: state.cart };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    loadQuote: (cart) => dispatch(loadQuote(cart)),
    loadCart: () => dispatch(loadCart())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
