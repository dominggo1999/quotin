import canvasActionTypes from './canvasActionTypes';

const {
  SET_CANVAS_ASPECT_RATIO,
} = canvasActionTypes;

const initialState = {
  aspectRatio: [1, 1.2], // w : h
  baseHeight: 530, // pixel
  baseWidth: 600,
  orientation: 'potrait',
};

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CANVAS_ASPECT_RATIO:
      return {
        ...state,
        aspectRatio: action.payload,
      };
    default:
      return state;
  }
};

export default canvasReducer;
