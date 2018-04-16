import React from 'react';
import { Total } from './Total';
import { QuoteItem } from './QuoteItem';
export const Quote = ({ quote }) => {
  const quoteItems = quote.get('lines').map(quoteItem => {
    return (<QuoteItem key={quoteItem.get('sku')} order={quoteItem}/>);
  });

  return (
    <div className={'quote'}>
      {quoteItems}
      <Total total={quote.get('total')}/>
    </div>
  );
};