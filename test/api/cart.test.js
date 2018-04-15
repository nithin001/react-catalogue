import MockAdapter from 'axios-mock-adapter';
import base from '../../src/api/base';
import { get, put } from '../../src/api/cart';
var mock = new MockAdapter(base);
describe('cart api get', () => {
  beforeEach(() => {
    mock.reset();
  });
  var mockOrder = {
    'sku': '199203',
    'quantity': 3
  };
  var mockResponse = { lines: [mockOrder] };
  it('should create an api get request to cart endpoint', (done) => {
    mock.onGet('/cart').reply(200, mockResponse);
    return get().then((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
  });

  it('should throw error when the backend fails', (done) => {
    mock.onGet('/cart').reply(500);
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when the network times out', (done) => {
    mock.onGet('/cart').timeout();
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when there is a low level network error', (done) => {
    mock.onGet('/cart').networkError();
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when the catalogue endpoint does not return valid data - empty map', (done) => {
    mock.onGet('/cart').reply(200, {});
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when the catalogue endpoint does not return valid data - empty lines', (done) => {
    mock.onGet('/cart').reply(200, { lines: [{}] });
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
});

describe('cart api put', () => {
  beforeEach(() => {
    mock.reset();
  });
  const mockOrder = {
    'sku': '374847',
    'name': 'Nice Product',
    'price': {
      'amount': 20,
      'currency': 'EUR'
    },
    'quantity': 3,
    'lineTotal': {
      'amount': 60,
      'currency': 'EUR'
    }
  };
  var mockResponse = {
    'lines': [mockOrder],
    'total': {
      'amount': 60,
      'currency': 'EUR'
    }
  };
  const request = [{
    'sku': '199203',
    'quantity': 3
  }, {
    'sku': '938821',
    'quantity': 1
  }];

  it('should create an api put request to cart endpoint', (done) => {
    mock.onPut('/cart').reply(200, mockResponse);
    return put(request).then((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
  });

  it('should throw error when the backend fails', (done) => {
    mock.onPut('/cart').reply(500);
    return put(request).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when the network times out', (done) => {
    mock.onPut('/cart').timeout();
    return put(request).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when there is a low level network error', (done) => {
    mock.onPut('/cart').networkError();
    return put(request).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when there is a bad request error', (done) => {
    mock.onPut('/cart').reply(400);
    return put(request).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when the catalogue endpoint does not return valid data - missing name', (done) => {
    const invalidOrder = { ...mockOrder };
    delete invalidOrder['name'];
    mock.onPut('/cart').reply(200, {
      'lines': [invalidOrder],
      'total': {
        'amount': 60,
        'currency': 'EUR'
      }
    });
    return put(request).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing name', (done) => {
    const invalidOrder = { ...mockOrder };
    delete invalidOrder['sku'];
    mock.onPut('/cart').reply(200, {
      'lines': [invalidOrder],
      'total': {
        'amount': 60,
        'currency': 'EUR'
      }
    });
    return put(request).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing price', (done) => {
    const invalidOrder = { ...mockOrder };
    delete invalidOrder['price'];
    mock.onPut('/cart').reply(200, {
      'lines': [invalidOrder],
      'total': {
        'amount': 60,
        'currency': 'EUR'
      }
    });
    return put(request).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing amount in price',
    (done) => {
      const invalidOrder = { ...mockOrder };
      delete invalidOrder.price.amount;
      mock.onPut('/cart').reply(200, {
        'lines': [invalidOrder],
        'total': {
          'amount': 60,
          'currency': 'EUR'
        }
      });
      return put(request).catch((error) => {
        expect(error).toEqual('backend_error');
        done();
      });
    });
  it('should throw error when the catalogue endpoint does not return valid data - missing currency in price',
    (done) => {
      const invalidOrder = { ...mockOrder };
      delete invalidOrder.price.currency;
      mock.onPut('/cart').reply(200, {
        'lines': [invalidOrder],
        'total': {
          'amount': 60,
          'currency': 'EUR'
        }
      });
      return put(request).catch((error) => {
        expect(error).toEqual('backend_error');
        done();
      });
    });

  it('should throw error when the catalogue endpoint does not return valid data - missing amount in lineTotal',
    (done) => {
      const invalidOrder = { ...mockOrder };
      delete invalidOrder.lineTotal.amount;
      mock.onPut('/cart').reply(200, {
        'lines': [invalidOrder],
        'total': {
          'amount': 60,
          'currency': 'EUR'
        }
      });
      return put(request).catch((error) => {
        expect(error).toEqual('backend_error');
        done();
      });
    });
  it('should throw error when the catalogue endpoint does not return valid data - missing currency in lineTotal',
    (done) => {
      const invalidOrder = { ...mockOrder };
      delete invalidOrder.lineTotal.currency;
      mock.onPut('/cart').reply(200, {
        'lines': [invalidOrder],
        'total': {
          'amount': 60,
          'currency': 'EUR'
        }
      });
      return put(request).catch((error) => {
        expect(error).toEqual('backend_error');
        done();
      });
    });
  it('should throw error when the catalogue endpoint does not return valid data - missing quantity', (done) => {
    const invalidOrder = { ...mockOrder };
    delete invalidOrder['quantity'];
    mock.onPut('/cart').reply(200, {
      'lines': [invalidOrder],
      'total': {
        'amount': 60,
        'currency': 'EUR'
      }
    });
    return put(request).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing lineTotal', (done) => {
    const invalidOrder = { ...mockOrder };
    delete invalidOrder['lineTotal'];
    mock.onPut('/cart').reply(200, {
      'lines': [invalidOrder],
      'total': {
        'amount': 60,
        'currency': 'EUR'
      }
    });
    return put(request).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing total', (done) => {
    mock.onPut('/cart').reply(200, {
      'lines': [mockOrder]
    });
    return put(request).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });

  });
  it('should throw error when the catalogue endpoint does not return valid data - missing currency in total',
    (done) => {
      mock.onPut('/cart').reply(200, {
        'lines': [mockOrder],
        'total': {
          'amount': 60,
        }
      });
      return put(request).catch((error) => {
        expect(error).toEqual('backend_error');
        done();
      });
    });

  it('should throw error when the catalogue endpoint does not return valid data - missing currency in total',
    (done) => {
      mock.onPut('/cart').reply(200, {
        'lines': [mockOrder],
        'total': {
          'currency': 'EUR',
        }
      });
      return put(request).catch((error) => {
        expect(error).toEqual('backend_error');
        done();
      });
    });
});