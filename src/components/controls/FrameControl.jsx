import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import OptionHeader from '../OptionHeader';
import ColorPicker from './ColorPicker';
import { updateLayerLayout } from '../../redux/layer/layerActions';
import ToggleDisplay from './ToggleDisplay';

const FrameControl = ({ item }) => {
  const dispatch = useDispatch();
  const {
    offset,
    width,
    opacity,
    display,
    color,
    name,
  } = item;
  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const changeColor = (value) => {
    dispatch(updateLayerLayout(name, 'color', value));
  };

  const updateFrame = (option, value) => {
    dispatch(updateLayerLayout(name, option, value));
  };

  const changeOpacity = (e) => {
    const int = e.target.value / 100;
    updateFrame('opacity', int);
  };

  const changeWidth = (e) => {
    // Max 50px
    // Min 1 px
    updateFrame('width', e.target.value);
  };

  const changeOffset = (e) => {
    // Max 25%
    // Min 0%
    updateFrame('offset', e.target.value);
  };

  return (
    <div className="order-1 w-full flex flex-col mb-10 text-white">
      <div className="w-full flex justify-between items-center mb-3">
        <OptionHeader title="Frame" />
        <ToggleDisplay name={name} />
      </div>
      <div className="flex flex-col items-center">
        <ColorPicker
          color={color}
          pickerColor={color}
          toggleColorPicker={toggleColorPicker}
          showColorPicker={showColorPicker}
          changeColor={(e) => changeColor(e)}
          title="Frame Color"
          type="rgba"
          pickerWidth="40%"
        />

        <div className="flex w-full flex-col mt-10">
          <p className="text-center mb-2">{opacity}</p>
          <input
            className="mb-2"
            type="range"
            min="0"
            max="100"
            onInput={changeOpacity}
            value={opacity * 100}
          />
          <p>Opacity</p>

          <p className="text-center mb-2">{width} px</p>
          <input
            className="mb-2"
            type="range"
            min="0"
            max="50"
            onInput={changeWidth}
            value={width}
          />
          <p>Frame thickness</p>

          <p className="text-center mb-2">{offset}%</p>
          <input
            className="mb-2"
            type="range"
            min="0"
            max="25"
            onInput={changeOffset}
            value={offset}
          />
          <p>Frame Offset
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrameControl;
