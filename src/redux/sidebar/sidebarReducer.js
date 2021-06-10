import sidebarActionTypes from './sidebarActionTypes';

const {
  HIDE_OPTION,
  SHOW_OPTION,
  SET_ACTIVE_TAB,
} = sidebarActionTypes;

const initialState = {
  activeTab: 'quick',
  showOption: true,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_OPTION:
      return {
        ...initialState,
        showOption: false,
        activeTab: '',
      };
    case SHOW_OPTION:
      return {
        ...initialState,
        showOption: true,
      };
    case SET_ACTIVE_TAB:
      return {
        ...initialState,
        activeTab: action.payload,
      };
    default:
      return initialState;
  }
};

export default sidebarReducer;
