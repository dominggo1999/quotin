import { combineReducers } from 'redux';
import sidebarReducer from './sidebar/sidebarReducer';
import layerReducer from './layer/layerReducer';

export default combineReducers({
  sidebar: sidebarReducer,
  layer: layerReducer,
});
