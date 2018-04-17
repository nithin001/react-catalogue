import React from 'react';
export const QuantityBar = ({ sku, quantity, addToCart, removeFromCart }) => {
  return <div className={'quantity-bar'}>
    <span className={'quantity'}>
      <span className={'quantity--legend'}>Quantity:&nbsp;</span>
      <span className={'quantity--value'}>{quantity}</span>
    </span>
    <br/>
    <button className={'button  '} onClick={() => {addToCart(sku);}}>Add to cart</button>
    <button className={'button button--inverted'} onClick={() => {removeFromCart(sku);}}>Remove from cart</button>
  </div>;
};