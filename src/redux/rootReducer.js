import { combineReducers } from 'redux';
import sidebarReducer from './sidebar/sidebarReducer';
import textReducer from './text/textReducer';
import layerReducer from './layer/layerReducer';

export default combineReducers({
  sidebar: sidebarReducer,
  layer: layerReducer,
  text: textReducer,
});
