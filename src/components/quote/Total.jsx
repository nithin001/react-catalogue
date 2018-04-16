import React from 'react';

export const Total = ({ total }) => (
  <div className={'quote-total'}>
    <span className={'amount'}>{total.get('amount')}</span>
    <span className={'currency'}>{total.get('currency')}</span>
  </div>
);