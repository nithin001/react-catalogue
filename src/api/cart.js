import instance from './base';
import Ajv from 'ajv';

export const get = () => {
  return new Promise((resolve, reject) => {
    instance.get('/cart')
      .then((response) => {
        if (response.data === undefined) {
          reject('backend_error');
          return;
        }
        const data = response.data;
        var ajv = new Ajv();
        var validate = ajv.compile(get_schema);
        var valid = validate(data);
        if (valid) {
          resolve(data);
        } else {
          reject('backend_error');
        }
      })
      .catch(error => {
        reject('backend_error');
      });
  });
};

const get_schema = {
  '$id': 'http://challenge.monoqi.net/cart',
  'type': 'object',
  'definitions': {},
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'properties': {
    'lines': {
      '$id': '/properties/lines',
      'type': 'array',
      'items': {
        '$id': '/properties/lines/items',
        'type': 'object',
        'properties': {
          'sku': {
            '$id': '/properties/lines/items/properties/sku',
            'type': 'string',
            'title': 'The Sku Schema ',
            'default': '',
            'examples': [
              '199203'
            ]
          },
          'quantity': {
            '$id': '/properties/lines/items/properties/quantity',
            'type': 'integer',
            'title': 'The Quantity Schema ',
            'default': 0,
            'examples': [
              3
            ]
          }
        },
        'required': ['sku', 'quantity']
      }
    }
  },
  'required': ['lines']
};