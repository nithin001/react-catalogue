import { get } from '../api/cart';

export const load = () => (dispatch) => {
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

export const addToCart = sku => ({ type: 'ADD_TO_CART', payload: sku });
export const removeFromCart = sku => ({ type: 'REMOVE_FROM_CART', payload: sku });
