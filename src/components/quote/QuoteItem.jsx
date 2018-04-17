import React from 'react';

export const QuoteItem = ({ order }) => (
  <div className={'quote-item'}>
    <span className={'quote-item__name'}>
      <span className={'quote-item__name quote-item__name--legend'}>Name:&nbsp;</span>
      <span className={'quote-item__name quote-item__name--value'}>{order.get('name')}</span>
    </span>
    <br/>
    <span className={'quote-item__price'}>
      <span className={'quote-item__name quote-item__name--legend'}>Price:&nbsp;</span>
      <span className={'quote-item__price quote-item__price--amount'}>{order.getIn(['price', 'amount'])}</span>
      &nbsp;
      <span className={'quote-item__price quote-item__price--currency'}>{order.getIn(['price', 'currency'])}</span>
    </span>
    <br/>
    <span className={'quote-item__total-quantity'}>
      <span className={'quote-item__quantity'}>
        <span className={'quote-item__quantity quote-item__quantity--legend'}>Quantity:&nbsp;</span>
        <span className={'quote-item__quantity quote-item__quantity--value'}>{order.get('quantity')}</span>
      </span>
      <span className={'quote-item__total'}>
        <span className={'quote-item__total quote-item__total--amount'}>{order.getIn(['lineTotal', 'amount'])}</span>
        &nbsp;
        <span className={'quote-item__total quote-item__total--currency'}>{order.getIn(
          ['lineTotal', 'currency'])}</span>
      </span>
    </span>
  </div>
);