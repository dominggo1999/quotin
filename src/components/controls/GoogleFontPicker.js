import { useState, useEffect } from 'react';
import {
  Category,
  Font,
  FONT_FAMILY_DEFAULT,
  FontManager,
  Options,
  OPTIONS_DEFAULTS,
  Script,
  SortOption,
  Variant,
} from '@samuelmeuli/font-manager';
import { useDispatch } from 'react-redux';
import FontInputSelect from './FontInputSelect';
import { addVisitedFonts } from '../../redux/font/fontActions';

/**
 * Return the fontId based on the provided font family
 */
const getFontId = (fontFamily) => {
  return fontFamily.replace(/\s+/g, '-').toLowerCase();
};

const GoogleFontPicker = (props) => {
  const dispatch = useDispatch();

  const defaultProps = {
    activeFontFamily: FONT_FAMILY_DEFAULT,
    onChange: () => {},
    pickerId: OPTIONS_DEFAULTS.pickerId,
    families: OPTIONS_DEFAULTS.families,
    categories: OPTIONS_DEFAULTS.categories,
    scripts: OPTIONS_DEFAULTS.scripts,
    variants: OPTIONS_DEFAULTS.variants,
    filter: OPTIONS_DEFAULTS.filter,
    limit: OPTIONS_DEFAULTS.limit,
    sort: OPTIONS_DEFAULTS.sort,
  };

  const {
    apiKey,
    activeFontFamily,
    pickerId,
    families,
    categories,
    scripts,
    variants,
    filter,
    limit,
    sort,
    onChange,
    changeFont,
    getFonts,
    fonts,
    visitedCategory,
    cachedFonts,
    fontCategory,
  } = props;

  const [status, setStatus] = useState('loading');

  const fetchFonts = () => {
    const fontManager = new FontManager(apiKey, activeFontFamily, {
      pickerId: pickerId || defaultProps.pickerId,
      families: families || defaultProps.families,
      categories: fontCategory || defaultProps.categories,
      scripts: scripts || defaultProps.scripts,
      variants: variants || defaultProps.variants,
      filter: filter || defaultProps.filter,
      limit: limit || defaultProps.limit,
      sort: sort || defaultProps.sort,
    }, onChange);

    // Generate font list
    fontManager
      .init()
      .then(() => {
        setStatus('finished');
        // Extract and sort font list
        const fonts = Array.from(fontManager.getFonts().values());

        getFonts(fonts);
        dispatch(addVisitedFonts(fontCategory));
      })
      .catch((err) => {
      // On error: Log error message
        setStatus('error');
        console.error('Error trying to fetch the list of available fonts');
        console.error(err);
      });
  };

  useEffect(() => {
    if(visitedCategory.indexOf(fontCategory) === -1) {
      fetchFonts();
    }else if (cachedFonts[fontCategory]) {
      getFonts(cachedFonts[fontCategory]);
      setStatus('finished');
    }
  }, [fontCategory]);

  const onSelection = (e) => {
    const target = e.target;
    const activeFontFamily = target.textContent;

    if (!activeFontFamily) {
      throw Error('Missing font family in clicked font button');
    }

    changeFont(activeFontFamily);
  };

  return (
    <div className="w-full mt-5">
      {status === 'finished' && fonts && (
      <FontInputSelect
        options={fonts}
        onSelection={onSelection}
        getFontId={getFontId}
      />
      )}
    </div>
  );
};

export default GoogleFontPicker;
