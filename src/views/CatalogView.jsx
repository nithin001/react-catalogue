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
    if (this.props.error) {
      return <span>Error loading catalog</span>;
    } else if (!this.props.catalogAvailable || this.props.catalogLoading) {
      return <span>Loading</span>;
    } else {
      return <div className={'catalog-view'}><Catalog/></div>;
    }
  }
}

export const mapStateToProps = (state, ownProps) => {
  const catalogAvailable = state.catalog.size > 0;
  const catalogLoading = state.ui.get('catalog_loading');
  const error = state.ui.get('error');
  return { catalogAvailable, catalogLoading, error };
};

export const mapDispatchToProp = (dispatch) => ({
    loadCatalog: () => {
      dispatch(load());
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProp)(CatalogView);
