import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cart';

export const Article = ({ article, addToCart }) => {
  return <div className="row">
    <div className="col s12">
      <div className="card white darken-1">
        <div className="card-content black-text">
          <span className="card-title">{article.get('name')}
            <br/>
            <span className="currency">
              {article.getIn(['price', 'amount'])}&nbsp; {article.getIn(
              ['price', 'currency'])}
            </span>
          </span>
          <div className={'article'}>
            <span className={'article__left'}>
              <img src={article.get('image')} className={'image'}/>
            </span>
            <span className={'article__right'}>
              <div className={'article_description'} dangerouslySetInnerHTML={
                { __html: article.get('description') }}/>
            </span>
          </div>
          <div className="card-action">
            <button className={'btn btn-large right'} onClick={() => {
              addToCart(article.get('sku'));
            }}>Add to cart
            </button>
            <div className="clearfix"/>
          </div>
        </div>
      </div>
    </div>
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
;;
