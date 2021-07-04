import canvasActionTypes from './canvasActionTypes';

const {
  SET_CANVAS_ASPECT_RATIO,
  REORDER_CANVAS,
  SET_CANVAS_ORIENTATION,
} = canvasActionTypes;

const initialState = {
  aspectRatio: [1, 1.2], // w : h
  baseHeight: 530, // pixel
  baseWidth: 600,
  orientation: 'potrait',
  order: ['author', 'quote', 'brand', 'frame', 'overlayColor', 'photo', 'baseColor'],
};

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CANVAS_ASPECT_RATIO:
      return {
        ...state,
        aspectRatio: action.payload,
      };
    case SET_CANVAS_ORIENTATION:
      return {
        ...state,
        orientation: action.payload,
      };
    case REORDER_CANVAS:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};

export default canvasReducer;
