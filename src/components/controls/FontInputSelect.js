import { useRef, useEffect } from 'react';

const FontInputSelect = ({
  options, onSelection, getFontId, fontCategory,
}) => {
  const fontsRef = useRef(null);

  useEffect(() => {
    fontsRef.current.scrollTo(0, 0);
  }, [fontCategory]);

  return (
    <ul
      ref={fontsRef}
      className="custom-scrollbar overflow-y-auto w-full text-white px-5"
    >
      {
        options.map((font) => {
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
  );
};

export default FontInputSelect;
