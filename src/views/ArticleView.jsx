import React from 'react';
import { connect } from 'react-redux';
import { load } from '../actions/article';
import Article from '../components/article';
class ArticleView extends React.Component {
  constructor (props) {
    super(props);
    if (!this.props.articleAvailable) {
      this.props.loadArticle(this.props.articleId);
    }
  }

  render () {
    if (!this.props.articleAvailable) {
      return (<div className="card-panel teal">
        <span className="white-text">The item was not found.</span>
      </div>);
    } else {
      return <div className={'article-view'}><Article/></div>;
    }
  }
}

export const mapStateToProps = (state, ownProps) => {
  const articleId = ownProps.match.params.articleId;
  const articleAvailable = state.article && state.article.get('sku') === articleId;
  const articleLoading = state.ui.get('article_loading');
  const error = state.ui.get('error');
  return { articleId, articleAvailable, articleLoading, error };
};

export const mapDispatchToProp = (dispatch) => ({
    loadArticle: (articleId) => {
      dispatch(load(articleId));
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProp)(ArticleView);
