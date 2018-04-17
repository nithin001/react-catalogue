import React from 'react';
import Catalog from '../components/catalog';
import { connect } from 'react-redux';
import { load } from '../actions/catalog';

class CatalogView extends React.Component {
  constructor (props) {
    super(props);
    if (!this.props.catalogAvailable) {
      this.props.loadCatalog();
    }
  }

  render () {
    return <div className={'catalog-view'}><Catalog/></div>;
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

export default connect(mapStateToProps, mapDispatchToProp)(CatalogView);
