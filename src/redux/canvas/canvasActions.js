import canvasActionTypes from './canvasActionTypes';

const {
  SET_CANVAS_ASPECT_RATIO,
  REORDER_CANVAS,
  SET_CANVAS_ORIENTATION,
} = canvasActionTypes;

export const setCanvasAspectRatio = (ratio) => ({
  type: SET_CANVAS_ASPECT_RATIO,
  payload: ratio,
});
export const setCanvasOrientation = (orientation) => ({
  type: SET_CANVAS_ORIENTATION,
  payload: orientation,
});

export const reorderCanvas = (order) => ({
  type: REORDER_CANVAS,
  payload: order,
});
