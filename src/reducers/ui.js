import Immutable from 'immutable';

const defaultState = Immutable.Map()
  .set('catalog_loading', false)
  .set('article_loading', false)
  .set('quote_loading', false)
  .set('cart_loaded_from_server', false)
  .set('cart_loading', false)
  .set('error', false);
const ui = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_CATALOG_START': {
      return state.set('catalog_loading', true).set('error', false);
    }
    case 'LOAD_CATALOG_COMPLETE': {
      return state.set('catalog_loading', false);
    }
    case 'LOAD_ARTICLE_START': {
      return state.set('article_loading', true).set('error', false);
    }
    case 'LOAD_ARTICLE_COMPLETE': {
      return state.set('article_loading', false);
    }
    case 'LOAD_CART_START': {
      return state.set('cart_loading', true).set('error', false);
    }
    case 'LOAD_CART_COMPLETE': {
      return state.set('cart_loading', false).set('cart_loaded_from_server', true);
    }
    case 'LOAD_QUOTE_START': {
      return state.set('quote_loading', true).set('error', false);
    }
    case 'LOAD_QUOTE_COMPLETE': {
      return state.set('quote_loading', false);
    }
    case 'LOAD_ERROR': {
      return defaultState.set('error', true);
    }
  }
  return state;
};
export default ui;
