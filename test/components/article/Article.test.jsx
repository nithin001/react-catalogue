import React from 'react';
import renderer from 'react-test-renderer';
import article from '../../../src/reducers/article';
import { Article } from '../../../src/components/article';
const mockArticle = {
  'sku': '199203',
  'name': 'IPad',
  'image': 'https://picsum.photos/480/480/?image=6',
  'description': 'test',
  'price': { 'amount': 229, 'currency': 'EUR' }
};
const articleState = article(undefined, { type: 'POPULATE_ARTICLE', payload: mockArticle });
describe('Article component', () => {
  it('should render the article item with name, image, description, price', () => {
    const props = {
      article: articleState
    };
    const article = renderer.create(<Article
      {...props}
    />);
    expect(article).toMatchSnapshot();
  });
});