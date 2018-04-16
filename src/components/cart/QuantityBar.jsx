import React from 'react';
export const QuantityBar = ({ id, quantity, addToCart, removeFromCart }) => {
  return <div className={'quantity-bar'}>
    <button className={'add-to-cart'} onClick={() => {addToCart(id);}}>Add to cart</button>
    <span className={'quantity'}>{quantity}</span>
    <button className={'remove-from-cart'} onClick={() => {removeFromCart(id);}}>Remove from cart</button>
  </div>;
};