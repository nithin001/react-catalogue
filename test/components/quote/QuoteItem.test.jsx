import React from 'react';
import renderer from 'react-test-renderer';
import quote from '../../../src/reducers/quote';
import { QuoteItem } from '../../../src/components/quote/QuoteItem';
var mockQuote = {
  'lines': [{
    'sku': '374847',
    'name': 'Nice Product',
    'price': {
      'amount': 20,
      'currency': 'EUR'
    },
    'quantity': 3,
    'lineTotal': {
      'amount': 60,
      'currency': 'EUR'
    }
  }],
  'total': {
    'amount': 60,
    'currency': 'EUR'
  }
};
const quoteState = quote(undefined, { type: 'POPULATE_QUOTE', payload: mockQuote });
describe('QuoteItem component', () => {
  it('should render the quote item with name, price, quantity and line total', () => {
    const props = {
      order: quoteState.getIn(['lines', 0])
    };
    const quoteItem = renderer.create(<QuoteItem
      {...props}
    />);
    expect(quoteItem).toMatchSnapshot();
  });
});