import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import WebFont from 'webfontloader';
import FontInputSelect from './FontInputSelect';
import { addVisitedFonts } from '../../redux/font/fontActions';

const getFontId = (fontFamily) => {
  return fontFamily.replace(/\s+/g, '-').toLowerCase();
};

const LIST_BASE_URL = 'https://www.googleapis.com/webfonts/v1/webfonts';

const GoogleFont = ({
  apiKey, changeFont, cachedFonts, visitedCategory, fontCategory, getFonts, fonts,
}) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('loading');

  // Get all fonts google fonts api provided (+- 1067 fonts)
  const getAllFonts = async (url) => {
    try {
      const response = await fetch(url.href);
      const { items } = await response.json();
      const filter = items.filter((item) => {
        if(!fontCategory) {
          return true;
        }
        return item.category === fontCategory;
      }).slice(0, 200);

      const families = filter.map((i) => {
        return i.family;
      });

      WebFont.load({
        google: {
          families,
        },
        loading: () => {
          setStatus('finished');
          getFonts(filter);
          dispatch(addVisitedFonts(fontCategory));
        },
      });
    } catch (err) {
      // On error: Log error message
      setStatus('error');
      console.error('Error trying to fetch the list of available fonts');
      console.error(err);
    }
  };

  const fetchFonts = () => {
    const url = new URL(LIST_BASE_URL);
    url.searchParams.append('sort', 'popularity');
    url.searchParams.append('key', apiKey);

    getAllFonts(url);
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
    <>
      {status === 'finished' && fonts && (
      <FontInputSelect
        options={fonts}
        onSelection={onSelection}
        getFontId={getFontId}
      />
      )}
    </>
  );
};

export default GoogleFont;
