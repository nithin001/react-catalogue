import React from 'react';

export const QuoteItem = ({ order }) => (
  <div className={'quote-item'}>
    <span className={'sku'}>{order.get('sku')}</span>
    <span className={'name'}>{order.get('name')}</span>
    <span className={'price-amount'}>{order.getIn(['price', 'amount'])}</span>
    <span className={'price-currency'}>{order.getIn(['price', 'currency'])}</span>
    <span className={'quantity'}>{order.get('quantity')}</span>
    <span className={'total-amount'}>{order.getIn(['lineTotal', 'amount'])}</span>
    <span className={'total-currency'}>{order.getIn(['lineTotal', 'currency'])}</span>
  </div>
);