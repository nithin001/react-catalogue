import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
export const CartTeaser = ({ count, amount, currency }) => {
  if (count === undefined || count === 0) {
    return <ul className={'right'}>
      <li><Link className={'waves-effect white-text btn-flat'} to={'/cart'}>No items in cart</Link></li>
    </ul>;
  }
  const text = count === 1 ? 'item' : 'items';
  return <ul className={'right'}>
    <li><Link className={'waves-effect white-text btn-flat'} to={'/cart'}>
      {count} {text} that costs <span className="currency currency--normal">{amount}&nbsp;{currency}</span>
    </Link></li>
  </ul>;
};

export const mapStateToProps = (state) => {
  const count = state.cart.reduce((result, item) => (result + item), 0);
  const amount = state.quote.getIn(['total', 'amount']);
  const currency = state.quote.getIn(['total', 'currency']);
  return { count, amount, currency };
};

export default connect(mapStateToProps, null)(CartTeaser);


