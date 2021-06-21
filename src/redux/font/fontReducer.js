/* eslint-disable no-case-declarations */
import fontActionTypes from './fontActionTypes';

const {
  ADD_VISITED_CATEGORY,
  CACHE_FONTS,
} = fontActionTypes;

const initialState = {
  visitedCategory: [],
  cachedFonts: {},
};

const fontReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VISITED_CATEGORY:
      return {
        ...state,
        visitedCategory: [...state.visitedCategory, action.payload],
      };

    case CACHE_FONTS:
      const category = action.payload.category;
      const fonts = action.payload.fonts;

      return {
        ...state,
        cachedFonts: {
          ...state.cachedFonts,
          [category]: fonts,
        },
      };
    default:
      return state;
  }
};

export default fontReducer;
