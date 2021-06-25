import canvasActionTypes from './canvasActionTypes';

const {
  SET_CANVAS_ASPECT_RATIO,
  REORDER_CANVAS,
} = canvasActionTypes;

export const setCanvasAspectRatio = (ratio) => ({
  type: SET_CANVAS_ASPECT_RATIO,
  payload: ratio,
});

export const reorderCanvas = (order) => ({
  type: REORDER_CANVAS,
  payload: order,
});
