import instance from '../../src/api/base';
test('instance should be a type of axios instance', () => {
  expect(instance.defaults.baseURL).toBe('http://challenge.monoqi.net/');
});