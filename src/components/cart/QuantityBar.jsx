import React from 'react';
export const QuantityBar = ({ sku, addToCart, removeFromCart }) => {
  return (<div class="card-action">
    <button className={'btn'} onClick={() => {addToCart(sku);}}>Add more</button>
    &nbsp;
    <button className={'btn-flat'} onClick={() => {removeFromCart(sku);}}>Remove one</button>
  </div>);
};