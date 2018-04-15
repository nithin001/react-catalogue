import Immutable from 'immutable';
import ui from '../../src/reducers/ui';

describe('ui reducer', () => {
  it('should return map with default state values when state is undefined', () => {
    const result = ui(undefined, 'SOME_RANDOM_ACTION');
    expect(Immutable.Map.isMap(result)).toEqual(true);
    expect(result.size).toEqual(5);
    expect(result.get('catalog_loading')).toEqual(false);
    expect(result.get('article_loading')).toEqual(false);
    expect(result.get('cart_loading')).toEqual(false);
    expect(result.get('quote_loading')).toEqual(false);
    expect(result.get('error')).toEqual(false);
  });

  it('should return current state when action is not understood', () => {
    const state = Immutable.Map().set('some_key', 'some_val');
    const result = ui(state, 'SOME_RANDOM_ACTION');
    expect(state).toBe(result);
  });

  it('should return catalog loading as true when LOAD_CATALOG_START is called', () => {
    const result = ui(Immutable.Map().set('error', true), { type: 'LOAD_CATALOG_START' });
    expect(result.get('error')).toBe(false);
    expect(result.get('catalog_loading')).toBe(true);
  });

  it('should return catalog loading as false when LOAD_CATALOG_COMPLETE is called', () => {
    const result = ui(Immutable.Map().set('catalog_loading', true)
      , { type: 'LOAD_CATALOG_COMPLETE' });
    expect(result.get('catalog_loading')).toBe(false);
  });

  it('should return article loading as true when LOAD_ARTICLE_START is called', () => {
    const result = ui(Immutable.Map().set('error', true), { type: 'LOAD_ARTICLE_START' });
    expect(result.get('error')).toBe(false);
    expect(result.get('article_loading')).toBe(true);
  });

  it('should return article loading as false when LOAD_ARTICLE_COMPLETE is called', () => {
    const result = ui(Immutable.Map().set('article_loading', true), { type: 'LOAD_ARTICLE_COMPLETE' });
    expect(result.get('article_loading')).toBe(false);
  });

  it('should return cart loading as true when LOAD_CART_START is called', () => {
    const result = ui(Immutable.Map().set('error', true), { type: 'LOAD_CART_START' });
    expect(result.get('error')).toBe(false);
    expect(result.get('cart_loading')).toBe(true);
  });

  it('should return cart loading as false when LOAD_CART_COMPLETE is called', () => {
    const result = ui(Immutable.Map().set('cart_loading', true), { type: 'LOAD_CART_COMPLETE' });
    expect(result.get('cart_loading')).toBe(false);
  });

  it('should return quote loading as true when LOAD_QUOTE_START is called', () => {
    const result = ui(Immutable.Map().set('error', true), { type: 'LOAD_QUOTE_START' });
    expect(result.get('error')).toBe(false);
    expect(result.get('quote_loading')).toBe(true);
  });

  it('should return quote loading as false when LOAD_QUOTE_COMPLETE is called', () => {
    const result = ui(Immutable.Map().set('quote_loading', true), { type: 'LOAD_QUOTE_COMPLETE' });
    expect(result.get('quote_loading')).toBe(false);
  });

  it('should return error as true and all other values as false when LOAD_ERROR is called', () => {
    const result = ui(Immutable.Map().set('error', false), { type: 'LOAD_ERROR' });
    expect(result.get('quote_loading')).toBe(false);
    expect(result.get('cart_loading')).toBe(false);
    expect(result.get('article_loading')).toBe(false);
    expect(result.get('catalog_loading')).toBe(false);
    expect(result.get('error')).toBe(true);
  });
});