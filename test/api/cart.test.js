import MockAdapter from 'axios-mock-adapter';
import base from '../../src/api/base';
import { get, put } from '../../src/api/cart';
describe('cart api get', () => {
  var mock = new MockAdapter(base);
  beforeEach(() => {
    mock.reset();
  });
  var mockOrder = {
    'sku': '199203',
    'quantity': 3
  };
  var mockResponse = { lines: [mockOrder] };
  test('should create an api get request to cart endpoint', (done) => {
    mock.onGet('/cart').reply(200, mockResponse);
    get().then((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
  });

  test('should throw error when the backend fails', (done) => {
    mock.onGet('/cart').reply(500);
    get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  test('should throw error when the network times out', (done) => {
    mock.onGet('/cart').timeout();
    get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  test('should throw error when there is a low level network error', (done) => {
    mock.onGet('/cart').networkError();
    get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  test('should throw error when the catalogue endpoint does not return valid data', (done) => {
    mock.onGet('/cart').reply(200, {});
    get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
    mock.reset();
    mock.onGet('/cart').reply(200, { lines: [{}] });
    get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
});