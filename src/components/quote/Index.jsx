import React from 'react';
import { connect } from 'react-redux';
import { Total } from './Total';
import { QuoteItem } from './QuoteItem';
export const Quote = ({ quote, loading }) => {
  if (loading) {
    return <span>Loading Cart</span>;
  }
  if (quote.get('lines') === undefined || quote.get('lines').size == 0) {
    return <span>Quotation is empty</span>;
  }
  const quoteItems = quote.get('lines').map(quoteItem => {
    return (<QuoteItem key={quoteItem.get('sku')} order={quoteItem}/>);
  });

  return (
    <div>
      <div className={'quote-items'}>
        {quoteItems}
      </div>
      <Total total={quote.get('total')}/>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return { quote: state.quote };
};

export default connect(mapStateToProps, null)(Quote);
