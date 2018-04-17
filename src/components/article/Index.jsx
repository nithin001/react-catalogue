import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cart';

export const Article = ({ article, addToCart }) => {
  return <div className={'article'}>
    <span className={'article__left'}>
      <img src={article.get('image')} className={'image'}/>
    </span>
    <span className={'article__right'}>
      <span className={'name'}>{article.get('name')}</span>
      <br/>
      <div className={'article_description'} dangerouslySetInnerHTML={
        { __html: article.get('description') }}/>
      <br/>
      <span className={'article__price'}>
        <span className={'article__price article__price--legend'}>Price: &nbsp;</span>
        <span className={'article__price article__price--amount'}>{article.getIn(['price', 'amount'])}</span>
        &nbsp;
        <span className={'article__price article__price--currency'}>{article.getIn(
          ['price', 'currency'])}</span>
      </span>
      <br/><br/>
      <button className={'button button-inverted'} onClick={() => {
        addToCart(article.get('sku'));
      }}>Add to cart
      </button>
    </span>
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
