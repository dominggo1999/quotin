import { combineReducers } from 'redux';
import sidebarReducer from './sidebar/sidebarReducer';
import quoteReducer from './quote/quoteReducer';

export default combineReducers({
  sidebar: sidebarReducer,
  quote: quoteReducer,
});
