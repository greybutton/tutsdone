import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'

import Gallery from './Gallery'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'

import {watchForLoadImages} from './sagas';

const store = createStore(
  reducer,
  applyMiddleware(createSagaMiddleware(watchForLoadImages))
);

import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Gallery />
  </Provider>,
  document.getElementById('root')
);
