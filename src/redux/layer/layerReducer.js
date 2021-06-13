/* eslint-disable max-classes-per-file */
import layerActionTypes from './layerActionTypes';

const {
  UPDATE_LAYER_LAYOUT,
  MODIFY_LAYER_TEXT,
  TOGGLE_LAYER,
} = layerActionTypes;

class Layer {
  constructor(options = {}) {
    this.display = options.display || true;
    this.opacity = options.opacity || 1;
  }
}

class TextLayer extends Layer {
  constructor(options = {}) {
    super();
    this.id = options.id || this.id;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 430;
    this.height = options.height || 200;
    this.type = 'text';
    this.name = options.name; // must have name
    this.text = options.text || '- Cak Lontong';
    this.content = options.content || '- Cak Lontong';
    this.uppercase = options.uppercase || false;
    this.shadow = options.shadow || false;
    this.textAlignment = options.textAlignment || 'center';
    this.italic = options.italic || false;
    this.bold = options.bold || false;
    this.alignment = options.alignment || 'horizontal';
    this.textColor = options.textColor || '#FFFFFF';
    this.highlightColor = options.highlightColor || '#e5ac00';
    this.font = options.font || 'Arial';
    this.fontSize = options.fontSize || 20;
    this.lineHeight = options.lineHeight || 1.2;
    this.letterSpacing = options.lineHeight || 0;
  }
}

// Instantiate quote
const quote = new TextLayer({
  name: 'quote',
  text: 'Berhentilah menuntut ilmu karena ilmu tidak bersalah',
  content: '<span>Berhentilah menuntut ilmu karena ilmu tidak bersalah</span>',
  id: 'quote',
  x: 10,
  y: 170,
  height: 'auto',
});

// Instantiate author
const author = new TextLayer({
  name: 'author',
  id: 'author',
  x: 250,
  y: 250,
  width: 150,
  fontSize: 16,
  textAlignment: 'right',
  height: 'auto',

});

const initialState = {
  quote,
  author,
};

const layerReducer = (state = initialState, action) => {
  const targetLayer = action.target;
  const targetSettings = state[action.target];
  const value = action.value;
  const option = action.option;

  switch (action.type) {
    case MODIFY_LAYER_TEXT:
      return {
        ...state,
        [targetLayer]: {
          ...targetSettings,
          [option]: value,
        },
      };
    case UPDATE_LAYER_LAYOUT:
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

export default layerReducer;
