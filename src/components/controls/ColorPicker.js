import { HexColorPicker } from 'react-colorful';

const ColorPicker = ({
  color, toggleColorPicker, showColorPicker, changeColor, title, adjustPosition,
}) => {
  const colorPickerStyle = {
    position: 'absolute',
    top: '30px',
    right: adjustPosition ? 'auto' : 0,
    left: adjustPosition ? 0 : 'auto',
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
            backgroundColor: color,
          }}
          role="button"
          onClick={toggleColorPicker}
          className="w-[60%] h-[20px] relative z-10"
        >
        </div>
        {showColorPicker
          && (
            <div>
              <HexColorPicker
                style={colorPickerStyle}
                color={color}
                onChange={changeColor}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default ColorPicker;
