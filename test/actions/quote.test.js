import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { load } from '../../src/actions/quote';
import * as api from '../../src/api/cart';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('quote actions', () => {
  const cart = [{
    'sku': '199203',
    'quantity': 3
  }, {
    'sku': '938821',
    'quantity': 1
  }];
  it('should fire LOAD_QUOTE_START action when load quote is called', (done) => {
    const store = mockStore({});
    return store.dispatch(load(cart))
      .then(() => {
        let action = store.getActions()[0];
        expect(action.type).toEqual('LOAD_QUOTE_START');
        done();
      });
  });

  it('should fire POPULATE_QUOTE action with empty payload when load quote is called with empty cart', () => {
    const store = mockStore({});
    store.dispatch(load([]));
    let action = store.getActions()[0];
    expect(action.type).toEqual('POPULATE_QUOTE');
    expect(action.payload).toEqual([]);
  });

  it('should call put cart api when load quote is called', (done) => {
    const spy = sinon.spy(api, 'put');
    const store = mockStore({});
    return store.dispatch(load(cart))
      .then(() => {
        expect(spy.called).toBe(true);
        spy.restore();
        done();
      });
  });

  it('should fire LOAD_CART_COMPLETE action when load quote is called successfully', (done) => {
    const store = mockStore({});
    const data = { 'some_key': 'some_val' };
    const stub = sinon.stub(api, 'put').returns(Promise.resolve(data));
    return store.dispatch(load(cart))
      .then(() => {
        expect(store.getActions()[0].type).toEqual('LOAD_QUOTE_START');
        expect(store.getActions()[1].type).toEqual('POPULATE_QUOTE');
        expect(store.getActions()[1].payload).toEqual(data);
        expect(store.getActions()[2].type).toEqual('LOAD_QUOTE_COMPLETE');
        stub.restore();
        done();
      });
  });

  it('should fire LOAD_ERROR action when load quote is called with error', (done) => {
    const store = mockStore({});
    const stub = sinon.stub(api, 'put').returns(Promise.reject('backend_error'));
    return store.dispatch(load(cart))
      .then(() => {
        expect(store.getActions()[0].type).toEqual('LOAD_QUOTE_START');
        expect(store.getActions()[1].type).toEqual('LOAD_ERROR');
        stub.restore();
        done();
      });
  });
});