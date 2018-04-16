import React from 'react';
import { configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { CartItem, mapStateToProps } from '../../../src/components/cart/CartItem';
import catalog from '../../../src/reducers/catalog';
configure({ adapter: new Adapter() });

describe('CartItem component', () => {
  it('should render the CartItem with a QuantityBar component', () => {
    const addToCart = jest.fn();
    const removeFromCart = jest.fn();
    const props = {
      sku: '199203',
      quantity: 3,
      price: { amount: 229, currency: 'EUR' },
      name: 'Ipad',
      addToCart,
      removeFromCart
    };
    const cartItem = shallow(<CartItem
      {...props}
    />);
    expect(shallowToJson(cartItem)).toMatchSnapshot();
  });
});

describe('Connected CartItem component', () => {
  it('should return the name of the item in cart', () => {
    var mockCatalog = {
      'articles': [{
        'sku': '199203',
        'name': 'IPad',
        'image': 'https://picsum.photos/480/480/?image=6',
        'price': { 'amount': 229, 'currency': 'EUR' }
      }]
    };
    const catalogState = catalog(undefined, { type: 'POPULATE_CATALOG', payload: mockCatalog });
    const result = mapStateToProps({ catalog: catalogState }, { sku: '199203' });
    expect(result.price).toEqual({ amount: 229, currency: 'EUR' });
    expect(result.name).toEqual('IPad');
  });
});