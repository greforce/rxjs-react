import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import './App.scss';
import Layout from './layout/containers/Layout';
import { rootEpic, rootReducer } from './redux';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      epicMiddleware,
    ),
  ),
);

epicMiddleware.run(rootEpic);

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
