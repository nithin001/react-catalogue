import React from 'react';
import { connect } from 'react-redux';
import materialize from 'materialize-css';
export const Toaster = ({ message }) => {
  if (message !== '') {
    materialize.toast(message, 1000);
  }
  return null;
};

export const mapStateToProps = (state) => {

  let message = '';
  if (state.ui.get('cart_loading')) {
    message = 'Loading cart';
  } else if (state.ui.get('quote_loading')) {
    message = 'Loading quotation';
  } else if (state.ui.get('article_loading')) {
    message = 'Loading article';
  } else if (state.ui.get('catalog_loading')) {
    message = 'Loading catalog';
  } else if (state.ui.get('error')) {
    message = 'There was an error. Please try again later!';
  }
  return { message };
};

export default connect(mapStateToProps, null)(Toaster);


