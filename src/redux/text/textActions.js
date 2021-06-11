import textActionType from './textActionType';

const {
  SET_CONTENT,
  SET_TEXT,
  MODIFY_TEXT,
} = textActionType;

export const setContent = (target, content) => ({
  type: SET_CONTENT,
  payload: content,
  target,
});

export const setText = (target, text) => ({
  type: SET_TEXT,
  payload: text,
  target,
});

export const modifyText = (target, option, value) => ({
  type: MODIFY_TEXT,
  target,
  value,
  option,
});
