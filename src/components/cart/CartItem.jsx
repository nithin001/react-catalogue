import React from 'react';
import { connect } from 'react-redux';
import { QuantityBar } from './QuantityBar';
import { addToCart, removeFromCart } from '../../actions/cart';
export const CartItem = ({ sku, price, name, quantity, addToCart, removeFromCart }) => {
  return <div class="card  darken-1">
    <div class="card-content black-text">
      <span class="card-title">
        {name}
        <br/>
        <span className="currency">
          {price.amount} {price.currency} X {quantity}
        </span>
      </span>
    </div>
    <QuantityBar sku={sku} quantity={quantity} addToCart={addToCart} removeFromCart={removeFromCart}/>
  </div>;
};

export const mapStateToProps = (state, ownProps) => {
  const article = state.catalog.filter(item => {
    return item.get('sku') === ownProps.sku;
  }).first();
  if (article === undefined) {
    return { price: { amount: 0, currency: '' }, name: '' };
  }
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
