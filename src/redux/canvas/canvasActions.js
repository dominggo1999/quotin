import canvasActionTypes from './canvasActionTypes';

const {
  SET_CANVAS_ASPECT_RATIO,
} = canvasActionTypes;

export const setCanvasAspectRatio = (ratio) => ({
  type: SET_CANVAS_ASPECT_RATIO,
  payload: ratio,
});
