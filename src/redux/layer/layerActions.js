import layerActionTypes from './layerActionTypes';

const {
  UPDATE_LAYER_LAYOUT,
  MODIFY_LAYER_TEXT,
  TOGGLE_LAYER,
  UPDATE_BACKGROUND,
} = layerActionTypes;

export const updateLayerLayout = (target, option, value) => ({
  type: UPDATE_LAYER_LAYOUT,
  target,
  option,
  value,
});

export const modifyLayerText = (target, option, value) => ({
  type: MODIFY_LAYER_TEXT,
  target,
  option,
  value,
});

export const updateBackground = (target, option, value) => ({
  type: UPDATE_BACKGROUND,
  target,
  option,
  value,
});

export const toggleLayer = (target) => ({
  type: UPDATE_LAYER_LAYOUT,
  target,
});
