import React from 'react';
import { Link } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import { CatalogItem } from '../../../src/components/catalog/CatalogItem';
import catalog from '../../../src/reducers/catalog';

configure({ adapter: new Adapter() });
var mockCatalog = {
  'articles': [{
    'sku': '199203',
    'name': 'IPad',
    'image': 'https://picsum.photos/480/480/?image=6',
    'price': { 'amount': 229, 'currency': 'EUR' }
  }]
};

const catalogState = catalog(undefined, { type: 'POPULATE_CATALOG', payload: mockCatalog });
describe('CatalogItem component', () => {
  it('should render the item with name, image, price add to cart button', () => {
    const addToCart = jest.fn();
    const props = { item: catalogState.get(0), addToCart };
    const catalogItem = renderer.create(<MemoryRouter><CatalogItem
      {...props}
    /></MemoryRouter>);
    expect(catalogItem).toMatchSnapshot();
  });

  it('should call add to cart when button is clicked', () => {
    const addToCart = jest.fn();
    const props = { item: catalogState.get(0), addToCart };
    const catalogItem = shallow(<CatalogItem
      {...props}
    />);
    catalogItem.find(Link).at(0).simulate('click');
    expect(addToCart.mock.calls.length).toBe(1);
    expect(addToCart.mock.calls[0][0]).toEqual('199203');
  });
});