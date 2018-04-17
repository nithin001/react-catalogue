import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
export const Cart = ({ cart}) => {
  const skus = [];
  cart.keySeq().forEach(key => skus.push(key));
  const items = skus.map((key) => (<CartItem
    key={key}
    sku={key}
    quantity={cart.get(key)}
  />));
  if (items.length === 0) {
    return (<div className="card-panel teal">
      <span className="white-text">There are no items in the cart.</span>
    </div>);
  }
  return <div className={'cart-items'}>{items}</div>;
};

export const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps, null)(Cart);
