import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Title from '../../../src/components/header/Title';

describe('title component', () => {
  it('should render the title component', () => {
    const title = renderer.create(<MemoryRouter><Title/></MemoryRouter>);
    expect(title).toMatchSnapshot();
  });
});