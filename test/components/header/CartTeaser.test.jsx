import React from 'react';
import renderer from 'react-test-renderer';
import Immutable from 'immutable';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import { CartTeaser, mapStateToProps } from '../../../src/components/header/CartTeaser';
import cart from '../../../src/reducers/cart';
import quote from '../../../src/reducers/quote';
configure({ adapter: new Adapter() });

describe('CartTeaser component', () => {
  it('should render the CartTeaser component with no items in cart text', () => {
    const props = { price: { amount: 0, currency: '' }, name: '' };
    const title = renderer.create(<MemoryRouter><CartTeaser
      {...props}
    /></MemoryRouter>);
    expect(title).toMatchSnapshot();
  });

  it('should render the CartTeaser component with count and amount', () => {
    const props = { loading: false, error: false, count: 5, amount: 60, currency: 'EUR' };
    const title = renderer.create(<MemoryRouter>
      <CartTeaser
        {...props}
      /></MemoryRouter>);
    expect(title).toMatchSnapshot();
  });
});

describe('Connected CartTeaser component', () => {

  it('should map state values to props of the component', () => {
    var mockCart = {
      lines: [{
        'sku': '199203',
        'quantity': 3
      }]
    };

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
    const cartState = cart(undefined, { type: 'POPULATE_CART', payload: mockCart });
    const quoteState = quote(undefined, { type: 'POPULATE_QUOTE', payload: mockQuote });
    const state = {
      ui: Immutable.Map()
        .set('cart_loading', false)
        .set('quote_loading', false)
        .set('error', false),
      cart: cartState,
      quote: quoteState,
    };
    const result = mapStateToProps(state);
    expect(result).toEqual({ count: 3, amount: 60, currency: 'EUR' });
  });
});