import quoteActionTypes from './quoteActionTypes';

const {
  SET_QUOTE_CONTENT,
  SET_QUOTE_TEXT,
} = quoteActionTypes;

const initialState = {
  quoteContent: 'TYPE YOUR QUOTE',
  quoteText: 'TYPE YOUR QUOTE',
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUOTE_CONTENT:
      return {
        ...state,
        quoteContent: action.payload,
      };
    case SET_QUOTE_TEXT:
      return {
        ...state,
        quoteText: action.payload,
      };

    default:
      return state;
  }
};

export default quoteReducer;
