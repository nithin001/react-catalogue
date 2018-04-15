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

export const put = (request) => {
  return new Promise((resolve, reject) => {
    instance.put('/cart', { data: request })
      .then((response) => {
        if (response.data === undefined) {
          reject('backend_error');
          return;
        }
        const data = response.data;
        var ajv = new Ajv();
        var validate = ajv.compile(put_schema);
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

const put_schema = {
  '$id': 'http://example.com/example.json',
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
          'name': {
            '$id': '/properties/lines/items/properties/name',
            'type': 'string',
            'title': 'The Name Schema ',
            'default': '',
            'examples': [
              'IPad'
            ]
          },
          'price': {
            '$id': '/properties/lines/items/properties/price',
            'type': 'object',
            'properties': {
              'amount': {
                '$id': '/properties/lines/items/properties/price/properties/amount',
                'type': 'integer',
                'title': 'The Amount Schema ',
                'default': 0,
                'examples': [
                  229
                ]
              },
              'currency': {
                '$id': '/properties/lines/items/properties/price/properties/currency',
                'type': 'string',
                'title': 'The Currency Schema ',
                'default': '',
                'examples': [
                  'EUR'
                ]
              }
            },
            'required': [
              'amount',
              'currency'
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
          },
          'lineTotal': {
            '$id': '/properties/lines/items/properties/lineTotal',
            'type': 'object',
            'properties': {
              'amount': {
                '$id': '/properties/lines/items/properties/lineTotal/properties/amount',
                'type': 'integer',
                'title': 'The Amount Schema ',
                'default': 0,
                'examples': [
                  687
                ]
              },
              'currency': {
                '$id': '/properties/lines/items/properties/lineTotal/properties/currency',
                'type': 'string',
                'title': 'The Currency Schema ',
                'default': '',
                'examples': [
                  'EUR'
                ]
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
          'price',
          'quantity',
          'lineTotal'
        ]
      }
    },
    'total': {
      '$id': '/properties/total',
      'type': 'object',
      'properties': {
        'amount': {
          '$id': '/properties/total/properties/amount',
          'type': 'integer',
          'title': 'The Amount Schema ',
          'default': 0,
          'examples': [
            1126
          ]
        },
        'currency': {
          '$id': '/properties/total/properties/currency',
          'type': 'string',
          'title': 'The Currency Schema ',
          'default': '',
          'examples': [
            'EUR'
          ]
        }
      },
      'required': [
        'amount',
        'currency'
      ]
    }
  },
  'required': [
    'lines',
    'total'
  ]
};