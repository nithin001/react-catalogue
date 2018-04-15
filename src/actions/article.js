import { get } from '../api/article';
export const load = (articleId) => {
  return (dispatch) => {
    dispatch({ type: 'LOAD_ARTICLE_START' });
    return get(articleId)
      .then((article) => {
        dispatch({ type: 'POPULATE_ARTICLE', payload: article });
        dispatch({ type: 'LOAD_ARTICLE_COMPLETE' });
      })
      .catch(() => {
        dispatch({ type: 'LOAD_ERROR' });
      });
  };
};