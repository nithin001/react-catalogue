import instance from './base';
import Ajv from 'ajv';

export const get = () => new Promise((resolve, reject) => {
  instance.get('/catalog')
    .then((response) => {
      if (response.data === undefined) {
        reject('backend_error');
        return;
      }
      const data = response.data;
      const ajv = new Ajv();
      const validate = ajv.compile(schema);
      const valid = validate(data);
      if (valid) {
        resolve(data);
      } else {
        reject('backend_error');
      }
    })
    .catch((error) => {
      reject('backend_error');
    });
});

const schema = {
  $id: 'http://challenge.monoqi.net/catalog',
  type: 'object',
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
  properties: {
    articles: {
      $id: '/properties/articles',
      type: 'array',
      items: {
        $id: '/properties/articles/items',
        type: 'object',
        additionalProperties: false,
        properties: {
          sku: {
            $id: '/properties/articles/items/properties/sku',
            type: 'string',
            title: 'The Sku Schema ',
            default: '',
          },
          name: {
            $id: '/properties/articles/items/properties/name',
            type: 'string',
            title: 'The Name Schema ',
            default: '',
          },
          image: {
            $id: '/properties/articles/items/properties/image',
            type: 'string',
            title: 'The Image Schema ',
            default: '',
          },
          price: {
            $id: '/properties/articles/items/properties/price',
            type: 'object',
            additionalProperties: false,
            properties: {
              amount: {
                $id: '/properties/articles/items/properties/price/properties/amount',
                type: 'number',
                title: 'The Amount Schema ',
                default: 0,
              },
              currency: {
                $id: '/properties/articles/items/properties/price/properties/currency',
                type: 'string',
                title: 'The Currency Schema ',
                default: '',
              },
            },
            required: [
              'amount',
              'currency',
            ],
          },
        },
        required: [
          'sku',
          'name',
          'image',
          'price',
        ],
      },
    },
  },
  required: [
    'articles',
  ],
};
