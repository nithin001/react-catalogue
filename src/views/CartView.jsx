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
      return <div className={'cart-view'}>
        <span>Error loading cart</span>
      </div>;
    } else if (this.props.catalogLoading) {
      return <div className={'cart-view'}>
        <span>Loading catalog</span>
      </div>;
    }
    return (<div className={'cart-view'}>
      <div className={'cart'}>
        <h3>Cart</h3>
        <Cart loading={this.props.cartLoading}/>
      </div>
      <div className={'quote'}>
        <h3>Quotation</h3>
        <Quote loading={this.props.quoteLoading}/>
      </div>
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
