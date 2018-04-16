import React from 'react';

export const CatalogItem = ({ item, addToCart }) => (
  <div className={'catalog-item'}>
    <span className={'name'}>{item.get('name')}</span>
    <img src={item.get('image')} className={'image'}/>
    <span className={'price-amount'}>{item.getIn(['price', 'amount'])}</span>
    <span className={'price-currency'}>{item.getIn(['price', 'currency'])}</span>
    <button onClick={() => {addToCart(item.get('sku'));}}>Add to cart</button>
  </div>);

