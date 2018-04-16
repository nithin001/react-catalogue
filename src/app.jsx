import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { HashRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './reducers';
import ArticleView from './views/ArticleView';
import CartView from './views/CartView';
import CatalogView from './views/CatalogView';

import Header from './components/header';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)));

const App = <Provider store={store}>
  <HashRouter>
    <div className={'app'}>
      <Header/>
      <Switch>
        <Route exact path="/" component={CatalogView}/>
        <Route path="/articles/:articleId" component={ArticleView}/>
        <Route path="/cart" component={CartView}/>
      </Switch>
    </div>
  </HashRouter>
</Provider>;

ReactDOM.render(
  App,
  document.getElementById('root'),
);