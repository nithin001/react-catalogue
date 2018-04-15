import Immutable from 'immutable';
const cart = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case 'POPULATE_CART': {
      const items = action.payload.lines;
      return items.reduce((result, item) => {
        return result.set(item.sku, item.quantity);
      }, Immutable.Map());
    }
    case 'ADD_TO_CART': {
      const sku = action.payload;
      if (state.has(sku)) {
        const quantity = state.get(sku);
        return state.set(sku, quantity + 1);
      }
      return state.set(sku, 1);
    }
    case 'REMOVE_FROM_CART': {
      const sku = action.payload;
      const quantity = state.get(sku);
      if (quantity === 1) {
        return state.delete(sku);
      }
      return state.set(sku, quantity - 1);
    }
  }
  return state;
};
export default cart;