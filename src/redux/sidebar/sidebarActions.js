import sidebarActionTypes from './sidebarActionTypes';

const {
  TOGGLE_OPTION,
  SET_ACTIVE_TAB,
} = sidebarActionTypes;

export const toggleOption = () => ({
  type: TOGGLE_OPTION,
});

export const setActiveTab = (id) => ({
  type: SET_ACTIVE_TAB,
  payload: id,
});
