import { useState, useEffect } from 'react';

const FontInputSelect = ({
  options, onSelection, getFontId,
}) => {
  return (
    <div className="w-full relative">
      <ul className="font-list-item w-full h-full">
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
    </div>
  );
};

export default FontInputSelect;
