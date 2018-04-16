import React from 'react';
import renderer from 'react-test-renderer';
import quote from '../../../src/reducers/quote';
import { Quote } from '../../../src/components/quote';
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
      quote: quoteState
    };
    const quote = renderer.create(<Quote
      {...props}
    />);
    expect(quote).toMatchSnapshot();
  });
});