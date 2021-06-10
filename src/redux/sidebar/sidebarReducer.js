import sidebarActionTypes from './sidebarActionTypes';

const {
  TOGGLE_OPTION,
  SET_ACTIVE_TAB,
} = sidebarActionTypes;

const initialState = {
  activeTab: 'quick',
  showOption: true,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OPTION:
      return {
        ...initialState,
        showOption: !state.showOption,
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
