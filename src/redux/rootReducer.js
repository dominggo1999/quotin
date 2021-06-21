import { combineReducers } from 'redux';
import sidebarReducer from './sidebar/sidebarReducer';
import layerReducer from './layer/layerReducer';
import canvasReducer from './canvas/canvasReducer';
import fontReducer from './font/fontReducer';

export default combineReducers({
  sidebar: sidebarReducer,
  layer: layerReducer,
  canvas: canvasReducer,
  font: fontReducer,
});
