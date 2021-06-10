import { combineReducers } from 'redux';
import sidebarReducer from './sidebar/sidebarReducer';

export default combineReducers({
  sidebar: sidebarReducer,
});
