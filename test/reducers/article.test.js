import Immutable from 'immutable';
import article from '../../src/reducers/article';

describe('article reducer', () => {
  var mockArticle = {
    'sku': '199203',
    'name': 'IPad',
    'image': 'https://picsum.photos/480/480/?image=6',
    'description': 'test',
    'price': { 'amount': 229, 'currency': 'EUR' }
  };
  it('should return empty map when state is undefined', () => {
    const result = article(undefined, 'SOME_RANDOM_ACTION');
    expect(Immutable.Map.isMap(result)).toEqual(true);
    expect(result.size).toEqual(0);
  });
  it('should return current state when action is not understood', () => {
    const state = Immutable.Map().set('some_key', 'some_val');
    const result = article(state, 'SOME_RANDOM_ACTION');
    expect(state).toBe(result);
  });
  it('should return state populated with article', () => {
    const action = { type: 'POPULATE_ARTICLE', payload: mockArticle };
    const result = article(undefined, action)
    expect(result.get('sku')).toEqual('199203');
    expect(result.get('name')).toEqual('IPad');
    expect(result.get('image')).toEqual('https://picsum.photos/480/480/?image=6');
    expect(result.get('description')).toEqual('test');
    expect(result.getIn(['price', 'amount'])).toEqual(229);
    expect(result.getIn(['price', 'currency'])).toEqual('EUR');
  });
});