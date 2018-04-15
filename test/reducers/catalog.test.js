import Immutable from 'immutable';
import catalog from '../../src/reducers/catalog';

describe('article reducer', () => {
  var mockArticle = {
    'sku': '199203',
    'name': 'IPad',
    'image': 'https://picsum.photos/480/480/?image=6',
    'price': { 'amount': 229, 'currency': 'EUR' }
  };
  var mockResponse = {
    'articles': [mockArticle]
  };
  it('should return empty map when state is undefined', () => {
    const result = catalog(undefined, 'SOME_RANDOM_ACTION');
    expect(Immutable.Map.isMap(result)).toEqual(true);
    expect(result.size).toEqual(0);
  });
  it('should return current state when action is not understood', () => {
    const state = Immutable.Map().set('some_key', 'some_val');
    const result = catalog(state, 'SOME_RANDOM_ACTION');
    expect(state).toBe(result);
  });
  it('should return state populated with catalog', () => {
    const action = { type: 'POPULATE_CATALOG', payload: mockResponse };
    const result = catalog(undefined, action);
    expect(result.getIn([0, 'sku'])).toEqual('199203');
    expect(result.getIn([0, 'name'])).toEqual('IPad');
    expect(result.getIn([0, 'image'])).toEqual('https://picsum.photos/480/480/?image=6');
    expect(result.getIn([0, 'price', 'amount'])).toEqual(229);
    expect(result.getIn([0, 'price', 'currency'])).toEqual('EUR');
  });
});