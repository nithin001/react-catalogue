import instance from './base';
import Ajv from 'ajv';

const get = () => {
  return new Promise((resolve, reject) => {
    instance.get('http://challenge.monoqi.net/catalog')
      .then((response) => {
        if (response.data === undefined) {
          reject('backend_error');
          return;
        }
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
        reject('backend_error');
      });
  });
};

export default get;

const schema = {
  '$id': 'http://challenge.monoqi.net/catalog',
  'type': 'object',
  'definitions': {},
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'additionalProperties': false,
  'properties': {
    'articles': {
      '$id': '/properties/articles',
      'type': 'array',
      'items': {
        '$id': '/properties/articles/items',
        'type': 'object',
        'additionalProperties': false,
        'properties': {
          'sku': {
            '$id': '/properties/articles/items/properties/sku',
            'type': 'string',
            'title': 'The Sku Schema ',
            'default': '',
          },
          'name': {
            '$id': '/properties/articles/items/properties/name',
            'type': 'string',
            'title': 'The Name Schema ',
            'default': '',
          },
          'image': {
            '$id': '/properties/articles/items/properties/image',
            'type': 'string',
            'title': 'The Image Schema ',
            'default': '',
          },
          'price': {
            '$id': '/properties/articles/items/properties/price',
            'type': 'object',
            'additionalProperties': false,
            'properties': {
              'amount': {
                '$id': '/properties/articles/items/properties/price/properties/amount',
                'type': 'integer',
                'title': 'The Amount Schema ',
                'default': 0,
              },
              'currency': {
                '$id': '/properties/articles/items/properties/price/properties/currency',
                'type': 'string',
                'title': 'The Currency Schema ',
                'default': '',
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
          'price'
        ]
      }
    }
  },
  'required': [
    'articles'
  ]
};