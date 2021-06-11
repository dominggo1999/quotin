import layerActionTypes from './layerActionTypes';

const {
  UPDATE_LAYER_POSITION,
  HIDE_LAYER,
  SHOW_LAYER,
} = layerActionTypes;

export const alignLayer = (target, option, value) => ({
  type: UPDATE_LAYER_POSITION,
  target,
  value,
  option,
});
