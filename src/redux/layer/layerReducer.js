/* eslint-disable max-classes-per-file */
import layerActionTypes from './layerActionTypes';

const {
  UPDATE_LAYER_LAYOUT,
  MODIFY_LAYER_TEXT,
  TOGGLE_LAYER,
  UPDATE_BACKGROUND,
} = layerActionTypes;

class TextLayer {
  constructor(options = {}) {
    this.id = options.id || this.id;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 200;
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
    this.display = options.display;
    this.opacity = options.opacity || 1;
  }
}

class BaseColorBackgroundLayer {
  constructor(options = {}) {
    this.name = options.name; // must have name
    this.type = 'background';
    this.id = options.id || 'baseColor';
    this.solidColor = options.solidColor || '#1E1E1E';
    this.color1 = options.color1 || '#1B2B6B  ';
    this.color2 = options.color2 || '#E29595';
    this.opacityColor1 = options.opacityColor1 || 1;
    this.opacityColor2 = options.opacityColor2 || 1;
    this.gradientRotation = options.gradientRotation || 90;
    this.colorStyle = options.colorStyle || 'solid';
    this.display = options.display;
    this.opacity = options.opacity || 1;
  }
}

class Photo {
  constructor(options = {}) {
    this.id = 'photo';
    this.imageID = options.imageID || '775199'; // pexels api
    this.name = 'photo';
    this.type = 'photo';
    this.display = options.display;
    this.opacity = options.opacity || 1;
  }
}

class Frame {
  constructor(options = {}) {
    this.id = 'frame';
    this.name = 'frame';
    this.type = 'frame';
    this.offset = options.offset || 5; // padding
    this.width = options.width || 10; // thickness
    this.opacity = options.opacity || 1;
    this.display = options.display || true;
    this.color = options.color || '#FFFFFF';
  }
}

// Instantiate quote
const quote = new TextLayer({
  name: 'quote',
  text: 'Berhentilah menuntut ilmu karena ilmu tidak bersalah',
  content: '<span>Berhentilah menuntut ilmu karena ilmu tidak bersalah</span>',
  id: 'quote',
  x: 35,
  y: 220,
  height: 'auto',
  textColor: '#FFFFFF',
  fontFamily: 'Indie Flower',
  fontSize: 20,
  display: true,
});

// Instantiate author
const author = new TextLayer({
  name: 'author',
  id: 'author',
  x: 100,
  y: 400,
  width: 150,
  fontSize: 18,
  textAlignment: 'right',
  height: 'auto',
  fontFamily: 'Amatic SC',
  display: true,
});

// Instantiate background
const baseColor = new BaseColorBackgroundLayer({
  id: 'baseColor',
  colorStyle: 'gradient',
  name: 'baseColor',
  gradientRotation: '0',
  display: true,
});

const photo = new Photo({
  display: true,
});
const frame = new Frame();

const initialState = {
  quote,
  author,
  baseColor,
  photo,
  frame,
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
