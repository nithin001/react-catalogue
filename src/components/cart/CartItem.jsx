import React from 'react';
import { connect } from 'react-redux';
import { QuantityBar } from './QuantityBar';
import { addToCart, removeFromCart } from '../../actions/cart';
export const CartItem = ({ sku, price, name, quantity, addToCart, removeFromCart }) => {
  return <div className={'cart-item'}>
    <span className={'cart-item__name'}>
      <span className={'cart-item__name cart-item__name--legend'}>Name:&nbsp;</span>
      <span className={'cart-item__name cart-item__name--value'}>{name}</span>
    </span>
    <br/>
    <span className={'cart-item__price cart-item__price--legend'}>Price: &nbsp;
      <span className={'cart-item__price cart-item__price--amount'}>{price.amount}</span>
      &nbsp;
      <span className={'cart-item__price cart-item__price--currency'}>{price.currency}</span>
    </span>
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
