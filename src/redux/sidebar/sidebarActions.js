import sidebarActionTypes from './sidebarActionTypes';

const {
  HIDE_OPTION,
  SET_ACTIVE_TAB,
} = sidebarActionTypes;

export const hideOption = () => ({
  type: HIDE_OPTION,
});

export const setActiveTab = (id) => ({
  type: SET_ACTIVE_TAB,
  payload: id,
});
