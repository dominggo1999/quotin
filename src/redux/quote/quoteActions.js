import quoteActionTypes from './quoteActionTypes';

const {
  SET_QUOTE_CONTENT,
  SET_QUOTE_TEXT,
} = quoteActionTypes;

export const setQuoteContent = (content) => ({
  type: SET_QUOTE_CONTENT,
  payload: content,
});

export const setQuoteText = (text) => ({
  type: SET_QUOTE_TEXT,
  payload: text,
});
