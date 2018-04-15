import { put } from '../api/cart';
export const load = (cart) => {
  return (dispatch) => {
    dispatch({ type: 'LOAD_QUOTE_START' });
    return put(cart)
      .then((quote) => {
        dispatch({ type: 'POPULATE_QUOTE', payload: quote });
        dispatch({ type: 'LOAD_QUOTE_COMPLETE' });
      })
      .catch(() => {
        dispatch({ type: 'LOAD_ERROR' });
      });
  };
};