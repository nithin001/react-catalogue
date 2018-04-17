import React from 'react';
import Cart from '../components/cart';
import Quote from '../components/quote';
import { connect } from 'react-redux';
import { load } from '../actions/catalog';

class CartView extends React.Component {
  constructor (props) {
    super(props);
    if (!this.props.catalogAvailable) {
      this.props.loadCatalog();
    }
  }

  render () {
    return (<div className={'cart-view'}>
      <div className={'cart'}>
        <Cart loading={this.props.cartLoading}/>
      </div>
      <div className={'quote'}>
        <Quote loading={this.props.quoteLoading}/>
      </div>
    </div>);
  }
}

export const mapStateToProps = (state, ownProps) => {
  const catalogAvailable = state.catalog.size > 0;
  return { catalogAvailable };
};

export const mapDispatchToProp = (dispatch) => ({
    loadCatalog: () => {
      dispatch(load());
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProp)(CartView);
