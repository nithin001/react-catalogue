import { put } from '../api/cart';

export const load = cart => (dispatch) => {
  if (cart.length === 0) {
    dispatch({ type: 'POPULATE_QUOTE', payload: [] });
  } else {
    dispatch({ type: 'LOAD_QUOTE_START' });
    return put(cart)
      .then((quote) => {
        dispatch({ type: 'POPULATE_QUOTE', payload: quote });
        dispatch({ type: 'LOAD_QUOTE_COMPLETE' });
      })
      .catch(() => {
        dispatch({ type: 'LOAD_ERROR' });
      });
  }
};
