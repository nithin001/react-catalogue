import MockAdapter from 'axios-mock-adapter';
import base from '../../src/api/base';
import get from '../../src/api/catalog';
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

  test('should make a axios request to the catalogue endpoint', (done) => {
    mock.onGet('/catalog').reply(200, mockResponse);
    get().then((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
  });

  test('should throw error when the backend fails', (done) => {
    mock.onGet('/catalog').reply(500);
    get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  test('should throw error when the network times out', (done) => {
    mock.onGet('/catalog').timeout();
    get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  test('should throw error when there is a low level network error', (done) => {
    mock.onGet('/catalog').networkError();
    get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  test('should throw error when the catalogue endpoint returns empty array', (done) => {
    mock.onGet('/catalog').reply(200, []);
    get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  test('should throw error when the catalogue endpoint does not return valid data', (done) => {
    let invalidArticle = { ...mockArticle };
    delete invalidArticle['sku'];
    mock.onGet('/catalog').reply(200, {
      'articles': [invalidArticle]
    });
    get().catch((error) => {
      expect(error).toEqual('backend_error');
    });
    mock.reset();

    invalidArticle = { ...mockArticle };
    delete invalidArticle['price'];
    mock.onGet('/catalog').reply(200, {
      'articles': [invalidArticle]
    });
    get().catch((error) => {
      expect(error).toEqual('backend_error');
    });

    invalidArticle = { ...mockArticle };
    delete invalidArticle['name'];
    mock.onGet('/catalog').reply(200, {
      'articles': [invalidArticle]
    });
    get().catch((error) => {
      expect(error).toEqual('backend_error');
    });

    invalidArticle = { ...mockArticle };
    delete invalidArticle['image'];
    mock.onGet('/catalog').reply(200, {
      'articles': [invalidArticle]
    });
    get().catch((error) => {
      expect(error).toEqual('backend_error');
    });

    invalidArticle = { ...mockArticle };
    delete invalidArticle['price']['currency'];
    mock.onGet('/catalog').reply(200, {
      'articles': [invalidArticle]
    });
    get().catch((error) => {
      expect(error).toEqual('backend_error');
    });

    invalidArticle = { ...mockArticle };
    delete invalidArticle['price']['amount'];
    mock.onGet('/catalog').reply(200, {
      'articles': [invalidArticle]
    });
    get().catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
});

