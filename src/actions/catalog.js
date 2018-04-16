import { get } from '../api/catalog';
export const load = () => {
  return (dispatch) => {
    dispatch({ type: 'LOAD_CATALOG_START' });
    return get()
      .then((catalog) => {
        dispatch({ type: 'POPULATE_CATALOG', payload: catalog });
        dispatch({ type: 'LOAD_CATALOG_COMPLETE' });
      })
      .catch((error) => {
        dispatch({ type: 'LOAD_ERROR' });
      });
  };
};