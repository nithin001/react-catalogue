import React from 'react';
import { configure, shallow } from 'enzyme';
import Immutable from 'immutable';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { Cart, mapStateToProps } from '../../../src/components/cart/Index';
import cart from '../../../src/reducers/cart';
configure({ adapter: new Adapter() });
var mockCart = {
  lines: [{
    'sku': '199203',
    'quantity': 3
  }, {
    'sku': '199204',
    'quantity': 5
  }]
};
const cartState = cart(undefined, { type: 'POPULATE_CART', payload: mockCart });
describe('Cart component', () => {
  it('should render the list of CartItem components', () => {
    const props = { cart: cartState };
    const cartObj = shallow(<Cart
      loading={false}
      {...props}
    />);
    expect(shallowToJson(cartObj)).toMatchSnapshot();
  });

  it('should render loading if loading', () => {
    const props = { cart: cartState };
    const cartObj = shallow(<Cart
      loading={true}
      {...props}
    />);
    expect(shallowToJson(cartObj)).toMatchSnapshot();
  });

  it('should render empty cart', () => {
    const props = { cart: Immutable.Map() };
    const cartObj = shallow(<Cart
      loading={false}
      {...props}
    />);
    expect(shallowToJson(cartObj)).toMatchSnapshot();
  });
});

describe('Connected Cart component', () => {
  it('should map state values to props of the component', () => {
    const state = {
      cart: cartState,
    };
    const result = mapStateToProps(state);
    expect(result).toEqual({ cart: cartState });
  });
});