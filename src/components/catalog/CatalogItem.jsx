import React from 'react';
import { Link } from 'react-router-dom';
export const CatalogItem = ({ item, addToCart }) => (
  <div className={'catalog-item'}>
    <Link to={`/articles/${item.get('sku')}`}>
      <img src={item.get('image')} className={'catalog-item__image'}/>
    </Link>
    <span className={'catalog-item__name'}>
      <span className={'catalog-item__name catalog-item__name--legend'}>Name:&nbsp;</span>
      <span className={'catalog-item__name catalog-item__name--value'}>{item.get('name')}</span>
    </span>
    <br/>
    <span className={'catalog-item__price catalog-item__price--legend'}>Price: &nbsp;
      <span className={'catalog-item__price catalog-item__price--amount'}>{item.getIn(['price', 'amount'])}</span>
      &nbsp;
      <span className={'catalog-item__price catalog-item__price--currency'}>{item.getIn(['price', 'currency'])}</span>
    </span>
    <br/>
    <Link to={`/articles/${item.get('sku')}`}>
      <button className={'button button--details'}>View
      </button>
    </Link>
    <button className={'button button--add-to-cart'}
            onClick={() => {addToCart(item.get('sku'));}}>Add
    </button>
  </div>);

