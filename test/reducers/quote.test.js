import Immutable from 'immutable';
import quote from '../../src/reducers/quote';

describe('quote reducer', () => {
  const mockOrder = {
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
  };
  var mockResponse = {
    'lines': [mockOrder],
    'total': {
      'amount': 60,
      'currency': 'EUR'
    }
  };
  it('should return empty map when state is undefined', () => {
    const result = quote(undefined, 'SOME_RANDOM_ACTION');
    expect(Immutable.Map.isMap(result)).toEqual(true);
    expect(result.size).toEqual(0);
  });
  it('should return current state when action is not understood', () => {
    const state = Immutable.Map().set('some_key', 'some_val');
    const result = quote(state, 'SOME_RANDOM_ACTION');
    expect(state).toBe(result);
  });
  it('should return state populated with quote', () => {
    const action = { type: 'POPULATE_QUOTE', payload: mockResponse };
    const result = quote(undefined, action);
    expect(result.getIn(['lines', 0, 'sku'])).toBe('374847');
    expect(result.getIn(['lines', 0, 'name'])).toBe('Nice Product');
    expect(result.getIn(['lines', 0, 'quantity'])).toBe(3);
    expect(result.getIn(['lines', 0, 'price', 'amount'])).toBe(20);
    expect(result.getIn(['lines', 0, 'price', 'currency'])).toBe('EUR');
    expect(result.getIn(['lines', 0, 'lineTotal', 'amount'])).toBe(60);
    expect(result.getIn(['lines', 0, 'lineTotal', 'currency'])).toBe('EUR');
    expect(result.getIn(['total', 'amount'])).toBe(60);
    expect(result.getIn(['total', 'currency'])).toBe('EUR');
  });
});