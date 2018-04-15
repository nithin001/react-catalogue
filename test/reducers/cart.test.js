import Immutable from 'immutable';
import cart from '../../src/reducers/cart';

describe('cart reducer', () => {
  var mockOrder = {
    'sku': '199203',
    'quantity': 3
  };
  var mockCart = { lines: [mockOrder] };
  it('should return empty map when state is undefined', () => {
    const result = cart(undefined, 'SOME_RANDOM_ACTION');
    expect(Immutable.Map.isMap(result)).toEqual(true);
    expect(result.size).toEqual(0);
  });
  it('should return current state when action is not understood', () => {
    const state = Immutable.Map().set('some_key', 'some_val');
    const result = cart(state, 'SOME_RANDOM_ACTION');
    expect(state).toBe(result);
  });
  it('should return updated cart when POPULATE_CART action is called with cart data', () => {
    const action = { type: 'POPULATE_CART', payload: mockCart };
    const result = cart(undefined, action);
    expect(result.size).toBe(1);
    expect(result.get('199203')).toBe(3);
  });

  it('should add an item to the cart', () => {
    const action = { type: 'ADD_TO_CART', payload: '199203' };
    const result = cart(undefined, action);
    expect(result.size).toBe(1);
    expect(result.get('199203')).toEqual(1);
  });

  it('should increment quantity if item already present', () => {
    const action = { type: 'ADD_TO_CART', payload: '199203' };
    const result = cart(Immutable.Map().set('199203', 5), action);
    expect(result.size).toBe(1);
    expect(result.get('199203')).toEqual(6);
  });

  it('should reduce the quantity of an item from the cart', () => {
    const action = { type: 'REMOVE_FROM_CART', payload: '199203' };
    const result = cart(Immutable.Map().set('199203', 5), action);
    expect(result.size).toBe(1);
    expect(result.get('199203')).toEqual(4);
  });

  it('should reduce the item from the cart', () => {
    const action = { type: 'REMOVE_FROM_CART', payload: '199203' };
    const result = cart(Immutable.Map().set('199203', 1), action);
    expect(result.size).toBe(0);
  });
});