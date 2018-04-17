import React from 'react';
import renderer from 'react-test-renderer';
import quote from '../../../src/reducers/quote';
import { mapStateToProps, Quote } from '../../../src/components/quote';
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
describe('Quote component', () => {
  it('should render the quote items', () => {
    const props = {
      quote: quoteState
    };
    const quote = renderer.create(<Quote
      loading={false}
      {...props}
    />);
    expect(quote).toMatchSnapshot();
  });

  it('should render loading if quote is loading', () => {
    const props = {
      quote: quoteState
    };
    const quote = renderer.create(<Quote
      loading={true}
      {...props}
    />);
    expect(quote).toMatchSnapshot();
  });
});

describe('Connected Catalog component', () => {
  it('should map state values to props of the component', () => {
    const state = {
      quote: quoteState,
    };
    const result = mapStateToProps(state);
    expect(result).toEqual({ quote: quoteState });
  });
});