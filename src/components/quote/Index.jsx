import React from 'react';
import { connect } from 'react-redux';
import { Total } from './Total';
import { QuoteItem } from './QuoteItem';
export const Quote = ({ quote }) => {
  if (quote.get('lines') === undefined || quote.get('lines').size == 0) {
    return <span>Quotation is empty</span>;
  }
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

export const mapStateToProps = (state) => {
  return { quote: state.quote };
};

export default connect(mapStateToProps, null)(Quote);
