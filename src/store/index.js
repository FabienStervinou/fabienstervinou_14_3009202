import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from '../features/reducers.js';
import thunk from 'redux-thunk';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = configureStore(
  {
    reducer: reducers
  },
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;
