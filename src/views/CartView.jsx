import React from 'react';
import Cart from '../components/cart';
import Quote from '../components/quote';
import { connect } from 'react-redux';
import { load } from '../actions/catalog';
import { load as loadCart } from '../actions/cart';

class CartView extends React.Component {
  constructor (props) {
    super(props);
    if (!this.props.catalogAvailable) {
      this.props.loadCatalog();
    }
    if (!this.props.cartLoaded) {
      this.props.loadCart();
    }
  }

  render () {

    if (this.props.error) {
      return <span>Error loading cart</span>;
    }
    const cart = this.props.cartLoading ? <span>Loading Cart</span> : <Cart/>;
    const quote = this.props.quoteLoading ? <span>Loading Quote</span> : <Quote/>;
    return (<div className={'cart-view'}>
      {cart}
      {quote}
    </div>);
  }
}

export const mapStateToProps = (state, ownProps) => {
  const catalogAvailable = state.catalog.size > 0;
  const catalogLoading = state.ui.get('catalog_loading');

  const cartLoaded = state.ui.get('cart_loaded_from_server');
  const cartLoading = state.ui.get('cart_loading');
  const error = state.ui.get('error');

  const quoteLoading = state.ui.get('quote_loading');
  return { catalogAvailable, catalogLoading, cartLoaded, cartLoading, quoteLoading, error };
};

export const mapDispatchToProp = (dispatch) => ({
    loadCatalog: () => {
      dispatch(load());
    },
    loadCart: () => {
      dispatch(loadCart());
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProp)(CartView);
