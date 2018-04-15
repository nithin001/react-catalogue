import Immutable from 'immutable';
const catalog = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case 'POPULATE_CATALOG': {
      const articles = action.payload.articles;
      return Immutable.fromJS(articles);
    }
  }
  return state;
};
export default catalog;