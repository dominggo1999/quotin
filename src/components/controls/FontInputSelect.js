import { useState, useEffect } from 'react';

const categories = ['sans-serif', 'serif', 'display', 'handwriting', 'monospace', ''];

const FontInputSelect = ({
  options, fontManager, onSelection, activeFontFamily, getFontId, realFontFamily, changeCategory, fontCategory,
}) => {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    setFonts(options);
  }, [options]);

  const filterFonts = (e) => {
    const input = e.target.value;

    if(!input) {
      setFonts(options);
    }else{
      const newArray = fonts.filter((item) => {
        return item.family.toLowerCase().indexOf(input) === 0;
      });

      setFonts(newArray);
    }
  };

  return (
    <div className="w-full relative">
      <div className="w-full flex flex-wrap mb-3 mt-2">
        {categories && categories.map((item) => {
          const isActive = item === fontCategory;
          const bg = isActive ? 'bg-purple-500 ' : 'bg-menu';
          return (
            <button
              onClick={() => changeCategory(item)}
              key={`font-category${item}`}
              className={`${bg} text-white mr-2 mb-2 py-1 px-2 rounded-lg focus:outline-none`}
            >{item || 'all'}
            </button>
          );
        })}
      </div>
      <input
        type="text"
        onChange={filterFonts}
        placeholder="Search font"
        className="w-full mb-3 px-3 py-2 text-lg text-black"
      />
      <ul className="font-list-item w-full">
        {
        fonts.map((font) => {
          const fontId = getFontId(font.family);

          return (
            <li
              key={fontId}
              className="w-full hover:bg-lightGray select-none"
              style={{
                fontFamily: font.family,
              }}
            >
              <button
                type="button"
                className="text-2xl w-full text-left focus:outline-none p-2"
                onClick={onSelection}
              >
                {font.family}
              </button>
            </li>
          );
        })
      }
      </ul>
    </div>
  );
};

export default FontInputSelect;
