import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { QuantityBar } from '../../../src/components/cart/QuantityBar';
configure({ adapter: new Adapter() });

describe('QuantityBar component', () => {
  it('should render the QuantityBar component with current count and two buttons', () => {
    const addToCart = jest.fn();
    const removeFromCart = jest.fn();
    const props = { id: '199203', quantity: 1, addToCart, removeFromCart };
    const quantityBar = renderer.create(<QuantityBar
      {...props}
    />);
    expect(quantityBar).toMatchSnapshot();
  });

  it('should call add to cart function on click of add to cart', () => {
    const addToCart = jest.fn();
    const removeFromCart = jest.fn();
    const props = { id: '199203', quantity: 1, addToCart, removeFromCart };
    const quantityBar = shallow(<QuantityBar
      {...props}
    />);
    quantityBar.find('button').at(0).simulate('click');
    expect(addToCart.mock.calls.length).toBe(1);
    expect(addToCart.mock.calls[0][0]).toEqual('199203');
  });

  it('should call remove from cart function on click of remove from cart', () => {
    const addToCart = jest.fn();
    const removeFromCart = jest.fn();
    const props = { id: '199203', quantity: 1, addToCart, removeFromCart };
    const quantityBar = shallow(<QuantityBar
      {...props}
    />);
    quantityBar.find('button').at(1).simulate('click');
    expect(removeFromCart.mock.calls.length).toBe(1);
    expect(removeFromCart.mock.calls[0][0]).toEqual('199203');
  });
});
