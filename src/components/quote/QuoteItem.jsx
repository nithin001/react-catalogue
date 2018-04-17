import React from 'react';

export const QuoteItem = ({ order }) => (

  <div className={'quote-item'}>
    <span class="card-title">{order.get('name')}
      <br/>
      <span className="left" style={{ fontSize: 'small', fontStyle: 'italic' }}>
          {order.getIn(['price', 'amount'])} {order.getIn(['price', 'currency'])}&nbsp;X&nbsp;{order.get('quantity')}
      </span>
      <span className="right" style={{ fontSize: 'small', fontStyle: 'italic' }}>
          {order.getIn(['lineTotal', 'amount'])} {order.getIn(['lineTotal', 'currency'])}
      </span>

    </span>
    <div className="clearfix"></div>
  </div>
);