import textActionType from './textActionType';

const {
  SET_CONTENT,
  SET_TEXT,
  MODIFY_TEXT,
} = textActionType;

class Text {
  constructor(options = {}) {
    this.name = options.name; // must have name
    this.text = options.text || 'Makan bang';
    this.content = options.content || 'Makan bang';
    this.uppercase = options.uppercase || false;
    this.shadow = options.shadow || false;
    this.textAlignment = options.textAlignment || 'center';
    this.italic = options.italic || false;
    this.bold = options.bold || false;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.alignment = options.alignment || 'horizontal';
    this.textColor = options.textColor || 'white';
    this.highlightColor = options.highlightColor || 'yellow';
    this.font = options.font || 'Arial';
    this.fontSize = options.font || 20;
  }
}

// Instantiate text
const quote = new Text({
  name: 'quote',
});

const author = new Text({
  name: 'author',
});

const initialState = {
  quote,
  author,
};

const textReducer = (state = initialState, action) => {
  const targetText = action.target;
  const targetSettings = state[action.target];
  const value = action.value;
  const option = action.option;

  switch (action.type) {
    case MODIFY_TEXT:
      return {
        ...state,
        [targetText]: {
          ...targetSettings,
          [option]: value,
        },
      };
    default:
      return state;
  }
};

export default textReducer;
