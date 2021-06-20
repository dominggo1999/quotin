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
  }
}

class Photo extends Layer {
  constructor(options = {}) {
    super();
    this.id = 'photo';
    this.imageID = options.imageID || '3347244'; // pexels api
    this.name = 'photo';
    this.type = 'photo';
    this.boundaryWidth = options.boundaryWidth || 0;
    this.boundaryHeight = options.boundaryHeight || 0;
    this.imageWidth = options.imageWidth || 0;
    this.imageHeight = options.imageHeight || 0;
    this.imageURL = options.imageURL || 0;
    this.x = options.imageURL || 0;
    this.y = options.imageURL || 0;
  }
}

// Instantiate quote
const quote = new TextLayer({
  name: 'quote',
  text: 'Berhentilah menuntut ilmu karena ilmu tidak bersalah',
  content: '<span>Berhentilah menuntut ilmu karena ilmu tidak bersalah</span>',
  id: 'quote',
  x: 5,
  y: 220,
  height: 'auto',
  textColor: '#FFFFFF',
  fontFamily: 'Indie Flower',
  fontSize: 25,
});

// Instantiate author
const author = new TextLayer({
  name: 'author',
  id: 'author',
  x: 250,
  y: 350,
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
  gradientRotation: '0',
});

const photo = new Photo();

const initialState = {
  quote,
  author,
  baseColor,
  photo,
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
