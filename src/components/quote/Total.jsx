import React from 'react';

export const Total = ({ total }) => (
  <span className={'quote-total'}>
    <span className={'quote-total__legend'}>Total:&nbsp;</span>
    <span className={'quote-total__value'}>
      <span className={'quote-total__value quote-total__value--amount'}>{total.get('amount')}</span>
      &nbsp;
      <span className={'quote-total__value quote-total__value--currency'}>{total.get('currency')}</span>
    </span>
  </span>
);