import { get } from '../api/cart';
export const load = () => {
  return (dispatch) => {
    dispatch({ type: 'LOAD_CART_START' });
    return get()
      .then((cart) => {
        dispatch({ type: 'POPULATE_CART', payload: cart });
        dispatch({ type: 'LOAD_CART_COMPLETE' });
      })
      .catch(() => {
        dispatch({ type: 'LOAD_ERROR' });
      });
  };
};