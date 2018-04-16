import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import { Catalog, mapStateToProps } from '../../../src/components/catalog';
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

describe('Catalog component', () => {
  it('should render the list of CatalogItems', () => {
    const addToCart = jest.fn();
    const props = { catalog: catalogState, addToCart };
    const catalogItems = renderer.create(<MemoryRouter><Catalog
      {...props}
    /></MemoryRouter>);
    expect(catalogItems).toMatchSnapshot();
  });
});

describe('Connected Catalog component', () => {
  it('should map state values to props of the component', () => {
    const state = {
      catalog: catalogState,
    };
    const result = mapStateToProps(state);
    expect(result).toEqual({ catalog: catalogState });
  });
});