import React from 'react';
import { Link } from 'react-router-dom';
export const CatalogItem = ({ item, addToCart }) => (
  <div className={'catalog-item'}>
    <div className="card white darken-1">
      <div className="card-content black-text">
        <span className="card-title">
          {item.get('name')}<br/>
          <span className="currency">{item.getIn(['price', 'amount'])} {item.getIn(
            ['price', 'currency'])}</span>
        </span>
        <img src={item.get('image')} className={'catalog-item__image'}/>
      </div>
      <div className="card-action">
        <Link to='' className={'btn white-text '} onClick={() => {addToCart(item.get('sku'));}}>
          Add to Cart
        </Link>
        <Link className={'btn-flat'} to={`/articles/${item.get('sku')}`}>View</Link>
      </div>
    </div>
  </div>);

