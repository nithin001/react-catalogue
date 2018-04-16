import React from 'react';
import { connect } from 'react-redux';
import { QuantityBar } from './QuantityBar';
import { addToCart, removeFromCart } from '../../actions/cart';
export const CartItem = ({ sku, price, name, quantity, addToCart, removeFromCart }) => {
  return <div className={'cart-item'}>
    <span className={'name'}>{name}</span>
    <span className={'price-amount'}>{price.amount}</span>
    <span className={'price-currency'}>{price.currency}</span>
    <QuantityBar sku={sku} quantity={quantity} addToCart={addToCart} removeFromCart={removeFromCart}/>
  </div>;
};

export const mapStateToProps = (state, ownProps) => {
  const article = state.catalog.filter(item => {
    return item.get('sku') === ownProps.sku;
  }).first();
  const price = {
    amount: article.getIn(['price', 'amount']),
    currency: article.getIn(['price', 'currency']),
  };
  return { price, name: article.get('name') };
};

export const mapDispatchToProp = (dispatch) => ({
    addToCart: (sku) => dispatch(addToCart(sku)),
    removeFromCart: (sku) => dispatch(removeFromCart(sku)),
  }
);

export default connect(mapStateToProps, mapDispatchToProp)(CartItem);
