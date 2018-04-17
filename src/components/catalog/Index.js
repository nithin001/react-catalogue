import React from 'react';
import { connect } from 'react-redux';
import { CatalogItem } from './CatalogItem';
import { addToCart } from '../../actions/cart';

export const Catalog = ({ catalog, addToCart }) => {
  const articles = [];
  catalog.keySeq().forEach((item) => {
    articles.push(catalog.get(item));
  });
  const articlesList = articles.map(item => (<CatalogItem key={item.get('sku')} item={item} addToCart={addToCart} />));
  if (articlesList.length == 0) {
    return (<div className="catalog">
      <div className="card-panel teal">
        <span className="white-text">There are no items in the catalog</span>
      </div>
    </div>);
  }
  return (<div className="catalog">
    {articlesList}
  </div>);
};

export const mapStateToProps = (state, ownProps) => ({ catalog: state.catalog });

export const mapDispatchToProp = dispatch => ({
  addToCart: sku => dispatch(addToCart(sku)),
}
);

export default connect(mapStateToProps, mapDispatchToProp)(Catalog);

