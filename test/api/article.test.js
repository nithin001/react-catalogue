import MockAdapter from 'axios-mock-adapter';
import base from '../../src/api/base';
import { get } from '../../src/api/article';
describe('article api', () => {
  var mock = new MockAdapter(base);
  beforeEach(() => {
    mock.reset();
  });
  var mockArticle = {
    'sku': '199203',
    'name': 'IPad',
    'image': 'https://picsum.photos/480/480/?image=6',
    'description': 'it',
    'price': { 'amount': 229, 'currency': 'EUR' }
  };

  it('should return the article successfully from server', (done) => {
    mock.onGet('/article/199203').reply(200, mockArticle);
    return get(199203).then((response) => {
      expect(response).toEqual(mockArticle);
      done();
    });
  });

  it('should throw error when the backend fails', (done) => {
    mock.onGet('/article/199203').reply(500);
    return get(199203).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when the network times out', (done) => {
    mock.onGet('/article/199203').timeout();
    return get(199203).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when there is a low level network error', (done) => {
    mock.onGet('/article/199203').networkError();
    return get(199203).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });

  it('should throw error when there is a low level network error', (done) => {
    mock.onGet('/article/199203').reply(404);
    return get(199203).catch((error) => {
      expect(error).toEqual('not_found');
      done();
    });
  });

  it('should throw error when the catalogue endpoint does not return valid data - missing sku', (done) => {
    const invalidArticle = { ...mockArticle };
    delete invalidArticle['sku'];
    mock.onGet('/article/199203').reply(200, invalidArticle);
    return get(199203).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing price', (done) => {
    const invalidArticle = { ...mockArticle };
    delete invalidArticle['price'];
    mock.onGet('/article/199203').reply(200, invalidArticle);
    return get(199203).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing name', (done) => {
    const invalidArticle = { ...mockArticle };
    delete invalidArticle['name'];
    mock.onGet('/article/199203').reply(200, invalidArticle);
    return get(199203).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing image', (done) => {
    const invalidArticle = { ...mockArticle };
    delete invalidArticle['image'];
    mock.onGet('/article/199203').reply(200, invalidArticle);
    return get(199203).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
  it('should throw error when the catalogue endpoint does not return valid data - missing currency in price',
    (done) => {
      const invalidArticle = { ...mockArticle };
      delete invalidArticle['price']['currency'];
      mock.onGet('/article/199203').reply(200, invalidArticle);
      return get(199203).catch((error) => {
        expect(error).toEqual('backend_error');
        done();
      });
    });
  it('should throw error when the catalogue endpoint does not return valid data - missing price in amount', (done) => {
    const invalidArticle = { ...mockArticle };
    delete invalidArticle['price']['amount'];
    mock.onGet('/article/199203').reply(200, invalidArticle);
    return get(199203).catch((error) => {
      expect(error).toEqual('backend_error');
      done();
    });
  });
});