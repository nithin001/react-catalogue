import { combineReducers } from 'redux';
import article from './article';
import cart from './cart';
import catalog from './catalog';
import quote from './quote';
import ui from './ui';

export default combineReducers({
  article,
  cart,
  catalog,
  quote,
  ui,
});
