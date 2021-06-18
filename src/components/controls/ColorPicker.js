import { HexColorPicker, RgbaColorPicker } from 'react-colorful';

const ColorPicker = ({
  color, pickerColor, toggleColorPicker, showColorPicker, changeColor, title, adjustPosition, type, pickerWidth,
}) => {
  const colorPickerStyle = {
    position: 'absolute',
    top: '30px',
    left: adjustPosition ? '-40px' : 0,
    padding: '10px',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 0 0 1px rgb(99 114 130 / 16%), 0 8px 16px rgb(27 39 51 / 8%)',
    zIndex: 100,
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
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
            <div>
              {
                type === 'hex'
                && (
                <HexColorPicker
                  style={colorPickerStyle}
                  color={color}
                  onChange={changeColor}
                />
                )
              }
              {
                type === 'rgba'
                && (
                <RgbaColorPicker
                  style={colorPickerStyle}
                  color={color}
                  onChange={changeColor}
                />
                )
              }

            </div>
          )}
      </div>
    </div>
  );
};

export default ColorPicker;
