import React from 'react';
import { connect } from 'react-redux';
export const CartTeaser = ({ loading, error, count, amount, currency }) => {
  let text = '';
  if (loading) {
    text = <span>Loading</span>;
  } else if (error) {
    text = <span>Error loading cart</span>;
  } else {
    text = <div>
      <span className={'count'}>{count}</span>
      <span className={'amount'}>{amount}</span>
      <span className={'currency'}>{currency}</span>
    </div>;
  }
  return <div className={'cart-teaser'}>{text}</div>;
};

export const mapStateToProps = (state) => {
  const error = state.ui.get('error');
  if (error) {
    return { error };
  }
  const loading = state.ui.get('cart_loading') || state.ui.get('quote_loading');
  if (loading) {
    return { loading };
  }

  const count = state.cart.size;
  const amount = state.quote.getIn(['total', 'amount']);
  const currency = state.quote.getIn(['total', 'currency']);
  return { loading, error, count, amount, currency };
};

export default connect(mapStateToProps, null)(CartTeaser);


