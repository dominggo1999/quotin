/* eslint-disable max-classes-per-file */
import layerActionTypes from './layerActionTypes';

const {
  UPDATE_LAYER_LAYOUT,
  MODIFY_LAYER_TEXT,
  TOGGLE_LAYER,
  UPDATE_BACKGROUND,
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
    this.fontFamily = options.fontFamily || 'Open Sans';
    this.fontSize = options.fontSize || 20;
    this.lineHeight = options.lineHeight || 1.2;
    this.letterSpacing = options.lineHeight || 0;
  }
}

class BaseColorBackgroundLayer extends Layer {
  constructor(options = {}) {
    super();
    this.width = options.width || '100%';
    this.height = options.height || '100%';
    this.name = options.name; // must have name
    this.type = 'background';
    this.id = options.id || this.id;
    this.solidColor = options.solidColor || {
      r: 30,
      g: 30,
      b: 30,
      a: 1,
    };
    this.color1 = options.color1 || {
      r: 27,
      g: 43,
      b: 107,
      a: 1,
    };
    this.color2 = options.color2 || {
      r: 226,
      g: 149,
      b: 149,
      a: 1,
    };
    this.gradientRotation = options.gradientRotation || 90;
    this.colorStyle = options.colorStyle || 'solid';
  }
}

// Instantiate quote
const quote = new TextLayer({
  name: 'quote',
  text: 'Berhentilah menuntut ilmu karena ilmu tidak bersalah',
  content: '<span>Berhentilah menuntut ilmu karena ilmu tidak bersalah</span>',
  id: 'quote',
  x: 10,
  y: 80,
  height: 'auto',
  textColor: '#FFFFFF',
  fontFamily: 'Indie Flower',
  fontSize: 30,
});

// Instantiate author
const author = new TextLayer({
  name: 'author',
  id: 'author',
  x: 250,
  y: 280,
  width: 150,
  fontSize: 16,
  textAlignment: 'right',
  height: 'auto',
  fontFamily: 'Amatic SC',
});

// Instantiate background
const baseColor = new BaseColorBackgroundLayer({
  id: 'baseColor',
  colorStyle: 'gradient',
  name: 'baseColor',
});

const initialState = {
  quote,
  author,
  baseColor,
};

const layerReducer = (state = initialState, action) => {
  const targetLayer = action.target;
  const targetSettings = state[action.target];
  const option = action.option;
  const value = action.value;

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
    case UPDATE_BACKGROUND:
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
