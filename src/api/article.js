import instance from './base';
import Ajv from 'ajv';

export const get = (articleId) => {
  return new Promise((resolve, reject) => {
    instance.get(`/article/${articleId}`)
      .then((response) => {
        const data = response.data;
        var ajv = new Ajv();
        var validate = ajv.compile(schema);
        var valid = validate(data);
        if (valid) {
          resolve(data);
        } else {
          reject('backend_error');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          reject('not_found');
          return;
        }
        reject('backend_error');
      });
    ;
  });
};

const schema = {
  '$id': 'http://challenge.monoqi.net/article/{articleId}',
  'type': 'object',
  'definitions': {},
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'additionalProperties': false,
  'properties': {
    'sku': {
      '$id': '/properties/sku',
      'type': 'string',
      'title': 'The Sku Schema ',
      'default': ''
    },
    'name': {
      '$id': '/properties/name',
      'type': 'string',
      'title': 'The Name Schema ',
      'default': ''
    },
    'image': {
      '$id': '/properties/image',
      'type': 'string',
      'title': 'The Image Schema ',
      'default': ''
    },
    'description': {
      '$id': '/properties/description',
      'type': 'string',
      'title': 'The Description Schema ',
      'default': ''
    },
    'price': {
      '$id': '/properties/price',
      'type': 'object',
      'additionalProperties': false,
      'properties': {
        'amount': {
          '$id': '/properties/price/properties/amount',
          'type': 'number',
          'title': 'The Amount Schema ',
          'default': 0
        },
        'currency': {
          '$id': '/properties/price/properties/currency',
          'type': 'string',
          'title': 'The Currency Schema ',
          'default': ''
        }
      },
      'required': [
        'amount',
        'currency'
      ]
    }
  },
  'required': [
    'sku',
    'name',
    'image',
    'description',
    'price'
  ]
};