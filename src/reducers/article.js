import Immutable from 'immutable';
const catalog = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case 'POPULATE_ARTICLE': {
      const articles = action.payload;
      return Immutable.fromJS(articles);
    }
  }
  return state;
};
export default catalog;