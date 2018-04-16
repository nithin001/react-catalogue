import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cart';

export const Article = ({ article, addToCart }) => {
  return <div className={'article'}>
    <span className={'name'}>{article.get('name')}</span>
    <span className={'description'}>{article.get('description')}</span>
    <img src={article.get('image')} className={'image'}/>
    <span className={'price-amount'}>{article.getIn(['price', 'amount'])}</span>
    <span className={'price-currency'}>{article.getIn(['price', 'currency'])}</span>
    <button className={'add-to-cart'} onClick={() => {
      addToCart(article.get('sku'));
    }}>Add to cart
    </button>
  </div>;
};

export const mapStateToProps = (state) => {
  return { article: state.article };
};

export const mapDispatchToProp = (dispatch) => ({
    addToCart: (sku) => dispatch(addToCart(sku)),
  }
);

export default connect(mapStateToProps, mapDispatchToProp)(Article);
