import sidebarActionTypes from './sidebarActionTypes';

const {
  HIDE_OPTION,
  SHOW_OPTION,
  HOTKEY_TOGGLE_OPTION,

} = sidebarActionTypes;

export const hideOption = () => ({
  type: HIDE_OPTION,
});

export const showOption = (id) => ({
  type: SHOW_OPTION,
  payload: id,
});

export const hotkeyToggleOption = () => ({
  type: HOTKEY_TOGGLE_OPTION,
});
