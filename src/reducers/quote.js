import Immutable from 'immutable';
const quote = (state = Immutable.Map(), action) => {
  if (action.type === 'POPULATE_QUOTE') {
    return Immutable.fromJS(action.payload);
  }
  return state;
};
export default quote;