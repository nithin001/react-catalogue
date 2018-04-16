import React from 'react';
export const QuantityBar = ({ sku, quantity, addToCart, removeFromCart }) => {
  return <div className={'quantity-bar'}>
    <button className={'add-to-cart'} onClick={() => {addToCart(sku);}}>Add to cart</button>
    <span className={'quantity'}>{quantity}</span>
    <button className={'remove-from-cart'} onClick={() => {removeFromCart(sku);}}>Remove from cart</button>
  </div>;
};