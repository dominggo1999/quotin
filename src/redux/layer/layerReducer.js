import layerActionTypes from './layerActionTypes';

const {
  UPDATE_LAYER_POSITION,
  HIDE_LAYER,
  SHOW_LAYER,
} = layerActionTypes;

class Layer {
  constructor(options = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 250;
    this.height = options.height || 200;
  }
}

// Instantiate Layer
const quote = new Layer({
  name: 'quote',
});

const author = new Layer({
  name: 'author',
});

const initialState = {
  quote,
  author,
};

// dummy canvas size
const canvasWidth = 450;
const height = 450;

const layerActions = (state = initialState, action) => {
  const targetLayer = action.target;
  const targetSettings = state[action.target];
  const value = action.value;
  const option = action.option;

  // Only align from align layer
  // const width = state[action.target].width;

  switch (action.type) {
    case UPDATE_LAYER_POSITION:
      return {
        ...state,
        [targetLayer]: {
          ...targetSettings,
          [option]: value,
        },
      };
    default:
      return state;
  }
};

export default layerActions;
