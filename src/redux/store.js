import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

// Kalau middelware > 1, buat array
const middleware = [];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
