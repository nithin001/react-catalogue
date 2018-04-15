import MockAdapter from 'axios-mock-adapter';
import base from '../../src/api/base';
import { get } from '../../src/api/catalog';
describe('catalog api', () => {
  var mock = new MockAdapter(base);
  var mockArticle = {
    'sku': '199203',
    'name': 'IPad',
    'image': 'https://picsum.photos/480/480/?image=6',
    'price': { 'amount': 229, 'currency': 'EUR' }
  };
  var mockResponse = {
    'articles': [mockArticle]
  };

  beforeEach(() => {
    mock.reset();
  });

  it('should make a axios request to the catalogue endpoint', (done) => {
    mock.onGet('/catalog').reply(200, mockResponse);
    return get().then((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
  });

  it('should throw error when the backend fails', (done) => {
    mock.onGet('/catalog').reply(500);
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when the network times out', (done) => {
    mock.onGet('/catalog').timeout();
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when there is a low level network error', (done) => {
    mock.onGet('/catalog').networkError();
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when the catalogue endpoint returns empty array', (done) => {
    mock.onGet('/catalog').reply(200, []);
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when the catalogue endpoint does not return valid data - missing sku', (done) => {
    const invalidArticle = { ...mockArticle };
    delete invalidArticle['sku'];
    mock.onGet('/catalog').reply(200, {
      'articles': [invalidArticle]
    });
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing price', (done) => {
    const invalidArticle = { ...mockArticle };
    delete invalidArticle['price'];
    mock.onGet('/catalog').reply(200, {
      'articles': [invalidArticle]
    });
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing name', (done) => {
    const invalidArticle = { ...mockArticle };
    delete invalidArticle['name'];
    mock.onGet('/catalog').reply(200, {
      'articles': [invalidArticle]
    });
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing image', (done) => {
    const invalidArticle = { ...mockArticle };
    delete invalidArticle['image'];
    mock.onGet('/catalog').reply(200, {
      'articles': [invalidArticle]
    });
    return get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing currency in price',
    (done) => {
      const invalidArticle = { ...mockArticle };
      delete invalidArticle['price']['currency'];
      mock.onGet('/catalog').reply(200, {
        'articles': [invalidArticle]
      });
      return get().catch((error) => {
        expect(error).toEqual('backend_error');
        done();
      });
    });
  it('should throw error when the catalogue endpoint does not return valid data - missing currency in amount',
    (done) => {
      const invalidArticle = { ...mockArticle };
      delete invalidArticle['price']['amount'];
      mock.onGet('/catalog').reply(200, {
        'articles': [invalidArticle]
      });
      return get().catch((error) => {
        expect(error).toEqual('backend_error');
        done();
      });
    });
});

