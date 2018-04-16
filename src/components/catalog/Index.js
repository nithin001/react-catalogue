import React from 'react';
import { connect } from 'react-redux';
import { CatalogItem } from './CatalogItem';
export const Catalog = ({ items, addToCart }) => {
  const articles = [];
  items.keySeq().forEach((item) => {
    articles.push(items.get(item));
  });
  const articlesList = articles.map(item => {
    return (<CatalogItem key={item.get('sku')} item={item} addToCart={addToCart}/>);
  });
  return (<div className={'catalog'}>
    {articlesList}
  </div>);
};

export const mapStateToProps = (state, ownProps) => {
  return { catalog: state.catalog };
};

export const mapDispatchToProp = (dispatch) => ({
    addToCart: (sku) => dispatch(addToCart(sku)),
  }
);

export default connect(mapStateToProps, mapDispatchToProp)(Catalog);


