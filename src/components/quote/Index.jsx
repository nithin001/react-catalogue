import React from 'react';
import { connect } from 'react-redux';
import { Total } from './Total';
import { QuoteItem } from './QuoteItem';
export const Quote = ({ quote, loading }) => {

  if (quote.get('lines') === undefined || quote.get('lines').size == 0) {
    return null;
  }

  const quoteItems = quote.get('lines').map(quoteItem => {
    return (<QuoteItem key={quoteItem.get('sku')} order={quoteItem}/>);
  });

  return (
    <div>
      <div className={'quote-items'}>
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            {quoteItems}
          </div>
          <div class="card-action white-text">
            <Total total={quote.get('total')}/>
          </div>
        </div>

      </div>

    </div>
  );
};

export const mapStateToProps = (state) => {
  return { quote: state.quote };
};

export default connect(mapStateToProps, null)(Quote);
