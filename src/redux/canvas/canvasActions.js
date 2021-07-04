import canvasActionTypes from './canvasActionTypes';

const {
  SET_CANVAS_ASPECT_RATIO,
  SET_CANVAS_ORIENTATION,
  REORDER_CANVAS,
  SET_IMAGE_ASPECT_RATIO,
} = canvasActionTypes;

export const setCanvasAspectRatio = (ratio) => ({
  type: SET_CANVAS_ASPECT_RATIO,
  payload: ratio,
});

export const setCanvasOrientation = (orientation) => ({
  type: SET_CANVAS_ORIENTATION,
  payload: orientation,
});

export const setImageAspectRatio = (ratio) => ({
  type: SET_IMAGE_ASPECT_RATIO,
  payload: ratio,
});

export const reorderCanvas = (order) => ({
  type: REORDER_CANVAS,
  payload: order,
});
