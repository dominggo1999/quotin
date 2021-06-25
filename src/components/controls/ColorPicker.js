import {
  HexColorPicker, HexColorInput,
} from 'react-colorful';
import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

const ColorPicker = ({
  color, pickerColor, toggleColorPicker, showColorPicker, changeColor, title, adjustPosition, type, pickerWidth,
}) => {
  const ref = useRef(null);
  const colorPickerStyle = {
    position: 'absolute',
    top: '30px',
    left: adjustPosition || 0,
    padding: '10px',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 0 0 1px rgb(99 114 130 / 16%), 0 8px 16px rgb(27 39 51 / 8%)',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
  };

  useClickOutside(ref, toggleColorPicker);

  return (
    <div className="w-full flex flex-col items-center justify-center mb-2">
      <p className="text-white">{title}</p>
      <div className="relative w-full flex justify-center">
        <div
          style={{
            background: pickerColor,
            width: pickerWidth,
            height: '20px',
            zIndex: 10,
          }}
          role="button"
          onClick={toggleColorPicker}
        >
        </div>
        {showColorPicker
          && (
            <div
              ref={ref}
            >
              <div style={colorPickerStyle}>
                <HexColorPicker
                  color={color}
                  onChange={changeColor}
                />
                <HexColorInput
                  color={color}
                  onChange={changeColor}
                  className=" border-purple-500 border-2 mt-2 rounded-lg text-center focus:outline-none text-black"
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ColorPicker;
