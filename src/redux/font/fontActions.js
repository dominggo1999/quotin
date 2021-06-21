import fontActionTypes from './fontActionTypes';

const {
  ADD_VISITED_CATEGORY,
  CACHE_FONTS,
} = fontActionTypes;

export const addVisitedFonts = (fonts) => ({
  type: ADD_VISITED_CATEGORY,
  payload: fonts,
});

export const cacheFonts = (category, fonts) => ({
  type: CACHE_FONTS,
  payload: {
    category,
    fonts,
  },
});
