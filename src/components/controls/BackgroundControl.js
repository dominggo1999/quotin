import { useDispatch } from 'react-redux';
import { useState } from 'react';
import OptionHeader from '../OptionHeader';
import { updateBackground } from '../../redux/layer/layerActions';
import ColorPicker from './ColorPicker';
import { toSolidColor, toGradientColor } from '../../util/colorConvert';

const Button = ({ children, bg, onClick }) => {
  return(
    <button
      onClick={onClick}
      className={`${bg} py-2 px-3 rounded-lg border-2 border-purple-500 mx-2 focus:outline-none `}
    >
      {children}
    </button>
  );
};

const initialShowPicker = {
  solidColor: false,
  color1: false,
  color2: false,
};

const BackgroundControl = ({ item }) => {
  const dispatch = useDispatch();

  const {
    color1, color2, colorStyle, solidColor, gradientRotation, name,
  } = item;

  const [showColorPicker, setShowColorPicker] = useState(initialShowPicker);

  const toggleColorPicker = (color) => {
    const copyState = { ...showColorPicker };

    copyState[color] = !copyState[color];

    if(color === 'color1') {
      copyState.color2 = false;
    }

    if(color === 'color2') {
      copyState.color1 = false;
    }

    setShowColorPicker(copyState);
  };

  const updateColorStyle = (value) => {
    setShowColorPicker(initialShowPicker);
    dispatch(updateBackground(name, 'colorStyle', value));
  };

  const changeColor = (option, value) => {
    dispatch(updateBackground(name, option, value));
  };

  const changeRotation = (e) => {
    dispatch(updateBackground(name, 'gradientRotation', e.target.value));
  };

  return (
    <div className="w-full flex flex-col pb-6 text-white">
      <OptionHeader title="Background Base Color" />
      <div className="flex justify-center">
        <Button
          bg={colorStyle === 'solid' ? 'bg-purple-500' : null}
          onClick={() => updateColorStyle('solid')}
        >Solid Color
        </Button>
        <Button
          bg={colorStyle === 'gradient' ? 'bg-purple-500' : null}
          onClick={() => updateColorStyle('gradient')}
        >Gradient
        </Button>
      </div>
      <div className="flex w-full relative mt-5">
        {
          colorStyle === 'solid'
          && (
          <ColorPicker
            color={solidColor}
            pickerColor={toSolidColor(solidColor)}
            toggleColorPicker={() => toggleColorPicker('solidColor')}
            showColorPicker={showColorPicker.solidColor}
            changeColor={(e) => changeColor('solidColor', e)}
            title="Color"
            type="rgba"
            pickerWidth="40%"
          />
          )
        }
        {
          colorStyle === 'gradient'
          && (
            <>
              <ColorPicker
                color={color1}
                pickerColor={toSolidColor(color1)}
                toggleColorPicker={() => toggleColorPicker('color1')}
                showColorPicker={showColorPicker.color1}
                changeColor={(e) => changeColor('color1', e)}
                title="Color 1"
                type="rgba"
                pickerWidth="60%"
              />
              <ColorPicker
                color={color2}
                pickerColor={toSolidColor(color2)}
                toggleColorPicker={() => toggleColorPicker('color2')}
                showColorPicker={showColorPicker.color2}
                changeColor={(e) => changeColor('color2', e)}
                title="Color 2"
                adjustPosition
                type="rgba"
                pickerWidth="60%"
                adjustPosition
              />
            </>
          )
        }
      </div>

      {/* Rotation */}

      {
        colorStyle === 'gradient' && (
        <div className="flex w-full flex-col mt-5">
          <p className="text-white text-center mb-2">{gradientRotation}</p>
          <input
            className="mb-2"
            type="range"
            min="0"
            max="360"
            onInput={changeRotation}
            value={gradientRotation}
          />
          <p className="text-white">Rotation</p>
        </div>
        )
      }
    </div>
  );
};

export default BackgroundControl;
