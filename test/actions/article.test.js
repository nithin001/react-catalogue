import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { load } from '../../src/actions/article';
import * as api from '../../src/api/article';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cart actions', () => {
  it('should fire LOAD_ARTICLE_START action when load article is called', (done) => {
    const store = mockStore({});
    return store.dispatch(load('199203'))
      .then(() => {
        let action = store.getActions()[0];
        expect(action.type).toEqual('LOAD_ARTICLE_START');
        done();
      });
  });
  it('should call get article api when load article is called', (done) => {
    const spy = sinon.spy(api, 'get');
    const store = mockStore({});
    return store.dispatch(load('199203'))
      .then(() => {
        expect(spy.called).toBe(true);
        spy.restore();
        done();
      });
  });

  it('should fire LOAD_ARTICLE_COMPLETE action when load article is called successfully', (done) => {
    const store = mockStore({});
    const data = { 'some_key': 'some_val' };
    const stub = sinon.stub(api, 'get').returns(Promise.resolve(data));
    return store.dispatch(load('199203'))
      .then(() => {
        expect(store.getActions()[0].type).toEqual('LOAD_ARTICLE_START');
        expect(store.getActions()[1].type).toEqual('POPULATE_ARTICLE');
        expect(store.getActions()[1].payload).toEqual(data);
        expect(store.getActions()[2].type).toEqual('LOAD_ARTICLE_COMPLETE');
        stub.restore();
        done();
      });
  });

  it('should fire LOAD_ERROR action when load article is called with backend error', (done) => {
    const store = mockStore({});
    const stub = sinon.stub(api, 'get').returns(Promise.reject('backend_error'));
    return store.dispatch(load('199203'))
      .then(() => {
        expect(store.getActions()[0].type).toEqual('LOAD_ARTICLE_START');
        expect(store.getActions()[1].type).toEqual('LOAD_ERROR');
        stub.restore();
        done();
      });
  });

  it('should fire LOAD_ERROR action when load article is called with not found error', (done) => {
    const store = mockStore({});
    const stub = sinon.stub(api, 'get').returns(Promise.reject('not_found'));
    return store.dispatch(load('199203'))
      .then(() => {
        expect(store.getActions()[0].type).toEqual('LOAD_ARTICLE_START');
        expect(store.getActions()[1].type).toEqual('LOAD_ERROR');
        stub.restore();
        done();
      });
  });
});