import React from 'react';

export const Total = ({ total }) => (
  <div style={{ fontSize: '2rem' }}>
    <span className={'left'}>Total</span>
    <span className={'right'} style={{ fontStyle: 'italic' }}>{total.get('amount')}&nbsp;{total.get('currency')}</span>
    <div className="clearfix"></div>
  </div>
);