import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleFont from './GoogleFont';
import { modifyLayerText } from '../../redux/layer/layerActions';
import { cacheFonts } from '../../redux/font/fontActions';

const API_KEY = import.meta.env.VITE_APP_FONT_API;

const categories = ['sans-serif', 'serif', 'display', 'handwriting', 'monospace', ''];

const FontPicker = ({ closeBrowser, name, activeFont }) => {
  const [activeFontFamily, setActiveFontFamily] = useState(activeFont);
  const [fontCategory, setFontCategory] = useState('');
  const [fonts, setFonts] = useState([]);
  const [displayedFonts, setDisplayedFonts] = useState([]);
  const { visitedCategory, cachedFonts } = useSelector((state) => state.font);

  const dispatch = useDispatch();

  const changeCategory = (category) => {
    setFontCategory(category);
  };

  useEffect(() => {
    dispatch(modifyLayerText(name, 'fontFamily', activeFontFamily));
  }, [activeFontFamily]);

  const getFonts = (list) => {
    const sort = list.sort((font1, font2) => font1.family.localeCompare(font2.family));

    setFonts(sort);
    setDisplayedFonts(sort);
    if(!cachedFonts[fontCategory]) {
      dispatch(cacheFonts(fontCategory, sort));
    }
  };

  const filterFonts = (e) => {
    const input = e.target.value.trim();

    if(!input) {
      setFonts(displayedFonts);
    }else{
      const newArray = displayedFonts.filter((item) => {
        return item.family.toLowerCase().indexOf(input) === 0 || item.family.indexOf(input) === 0;
      });

      setFonts(newArray);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full px-5">
        <button
          className="py-1 px-5 mb-2 font-bold text-white text-sm bg-purple-500 rounded-lg"
          onClick={closeBrowser}
        >Back
        </button>
        <div className="w-full flex flex-wrap mb-3 mt-2">
          {categories && categories.map((item) => {
            const isActive = item === fontCategory;
            const bg = isActive ? 'bg-purple-500 ' : 'bg-menu';
            return (
              <button
                onClick={() => changeCategory(item)}
                key={`font-category-${item}`}
                className={`${bg} text-sm text-white mr-2 mb-2 py-1 px-2 rounded-lg focus:outline-none`}
              >{item || 'all'}
              </button>
            );
          })}
        </div>
        <div className="w-full">
          <input
            type="text"
            onChange={filterFonts}
            placeholder="Search font"
            className="w-full mb-3 px-3 py-2 text-lg text-black"
          />
        </div>
      </div>
      <GoogleFont
        apiKey={API_KEY}
        changeFont={(f) => setActiveFontFamily(f)}
        cachedFonts={cachedFonts}
        visitedCategory={visitedCategory}
        fontCategory={fontCategory}
        getFonts={getFonts}
        fonts={fonts}
      />
    </div>
  );
};

export default FontPicker;
