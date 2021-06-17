import sidebarActionTypes from './sidebarActionTypes';

const {
  HIDE_OPTION,
  SHOW_OPTION,
  HOTKEY_TOGGLE_OPTION,
} = sidebarActionTypes;

const initialState = {
  activeTab: 'quick',
  previousActiveTab: 'quick',
  displayOption: false,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    // Remember option if closed for toggle option hotkey functionality
    case HIDE_OPTION:
      return {
        ...state,
        displayOption: false,
        activeTab: '',
        previousActiveTab: state.activeTab,
      };
    case SHOW_OPTION:
      return {
        ...state,
        displayOption: true,
        activeTab: action.payload,
      };
    case HOTKEY_TOGGLE_OPTION:
      // If active hide option but remember the previous option
      if(state.displayOption) {
        return {
          ...state,
          displayOption: false,
          activeTab: '',
          previousActiveTab: state.activeTab,
        };
      }

      // If not active show previous option
      return {
        ...state,
        displayOption: true,
        activeTab: state.previousActiveTab,
      };

    default:
      return state;
  }
};

export default sidebarReducer;
