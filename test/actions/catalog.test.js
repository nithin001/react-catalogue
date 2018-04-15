import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { load } from '../../src/actions/catalog';
import * as api from '../../src/api/catalog';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('catalog actions', () => {
  it('should fire LOAD_CATALOG_START action when load catalog is called', (done) => {
    const store = mockStore({});
    return store.dispatch(load())
      .then(() => {
        let action = store.getActions()[0];
        expect(action.type).toEqual('LOAD_CATALOG_START');
        done();
      });
  });
  it('should call get catalog api when load catalog is called', (done) => {
    const spy = sinon.spy(api, 'get');
    const store = mockStore({});
    return store.dispatch(load())
      .then(() => {
        expect(spy.called).toBe(true);
        spy.restore();
        done();
      });
  });

  it('should fire LOAD_CATALOG_COMPLETE action when load catalog is called successfully', (done) => {
    const store = mockStore({});
    const data = { 'some_key': 'some_val' };
    const stub = sinon.stub(api, 'get').returns(Promise.resolve(data));
    return store.dispatch(load())
      .then(() => {
        expect(store.getActions()[0].type).toEqual('LOAD_CATALOG_START');
        expect(store.getActions()[1].type).toEqual('POPULATE_CATALOG');
        expect(store.getActions()[1].payload).toEqual(data);
        expect(store.getActions()[2].type).toEqual('LOAD_CATALOG_COMPLETE');
        stub.restore();
        done();
      });
  });

  it('should fire LOAD_ERROR action when load catalog is called with error', (done) => {
    const store = mockStore({});
    const stub = sinon.stub(api, 'get').returns(Promise.reject('backend_error'));
    return store.dispatch(load())
      .then(() => {
        expect(store.getActions()[0].type).toEqual('LOAD_CATALOG_START');
        expect(store.getActions()[1].type).toEqual('LOAD_ERROR');
        stub.restore();
        done();
      });
  });
});