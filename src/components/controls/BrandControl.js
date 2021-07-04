import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SelectSearch, { fuzzySearch } from 'react-select-search';
import OptionHeader from '../OptionHeader';
import { updateLayerLayout } from '../../redux/layer/layerActions';
import ColorPicker from './ColorPicker';
import { brandData } from '../../data/brandData';
import 'react-select-search/style.css';
import useBrandIcon from '../../hooks/useBrandIcon';
import ToggleDisplay from './ToggleDisplay';

const pos = ['start-start', 'center-start', 'end-start', 'start-center', 'center-center', 'end-center', 'start-end', 'center-end', 'end-end'];

const BrandControl = ({ item }) => {
  const dispatch = useDispatch();

  const {
    color, display, icon, id, opacity, position, size, text, name,
  } = item;

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activePosition, setActivePosition] = useState(position);

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  const renderBrand = (props, option, snapshot, className) => {
    const text = capitalize(option.name);
    const Icon = option.icon;

    return (
      <button
        {...props}
        className={`${className} flex items-center px-2`}
        type="button"
      >
        <Icon />
        <span className="ml-3">{text}</span>
      </button>
    );
  };

  const renderBrandValue = (valueProps, snapshot, className) => {
    const { option } = snapshot;

    if(option) {
      const text = capitalize(icon);
      const Icon = useBrandIcon(icon, brandData);

      return (
        <span
          {...valueProps}
          className={`${className} select-none flex items-center px-2`}
          type="button"
        >
          <Icon />
          <span className="ml-3">{text}</span>
        </span>
      );
    }

    return null;
  };

  const handleBrandChange = (e) => {
    dispatch(updateLayerLayout(name, 'icon', e));
  };

  const handleTextChange = (e) => {
    const value = e.target.value;

    dispatch(updateLayerLayout(name, 'text', value));
  };

  const updateBrand = (option, value) => {
    dispatch(updateLayerLayout(name, option, value));
  };

  const changeOpacity = (e) => {
    const int = e.target.value / 100;
    updateBrand('opacity', int);
  };

  const changeFontSize = (e) => {
    updateBrand('size', e.target.value);
  };

  const changeColor = (value) => {
    updateBrand('color', value);
  };

  const changePosition = (pos) => {
    setActivePosition(pos);
    updateBrand('position', pos);
  };

  return (
    <div className="order-1 w-full flex flex-col mb-10 text-white">
      <div className="w-full flex justify-between select-none">
        <OptionHeader title="Brand" />
        <ToggleDisplay name={name} />
      </div>
      <div className="flex flex-col">
        <div className="text-black">
          <p className="text-white mb-2 select-none">Choose icon:</p>
          {
          brandData
          && (
          <SelectSearch
            options={brandData}
            renderOption={renderBrand}
            renderValue={renderBrandValue}
            className="select-search w-full z-50"
            onChange={handleBrandChange}
            value={icon}
          />
          )
        }
        </div>
        <p className="text-white my-2 select-none">Username or URL :</p>
        <input
          className="text-black p-3 focus:outline-none w-full"
          type="text"
          value={text}
          placeholder={text}
          maxLength="20"
          onChange={handleTextChange}
        />

        <div className="flex w-full flex-col mt-10">

          {/* color */}
          <ColorPicker
            color={color}
            pickerColor={color}
            toggleColorPicker={toggleColorPicker}
            showColorPicker={showColorPicker}
            changeColor={(e) => changeColor(e)}
            title="Brand Color"
            type="rgba"
            pickerWidth="40%"
          />

          {/* opacity */}
          <p className="text-center mb-2">{size}</p>
          <input
            className="mb-2"
            type="range"
            min="10"
            max="20"
            onInput={changeFontSize}
            value={size}
          />
          <p>Font size</p>

          {/* font size */}
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

        </div>

        <div className="text-white mt-4 flex items-center justify-center">
          <p className="mr-2">Position</p>
          <div
            style={{
              width: '100px',
            }}
            className="grid gap-1 grid-cols-3"
          >
            {
              pos.map((item) => {
                const bg = item === activePosition ? 'bg-purple-500' : null;

                return (
                  <span
                    key={`position${item}`}
                    role="button"
                    label="position"
                    onClick={() => changePosition(item)}
                    style={{ height: `${100 / 3}px` }}
                    className={`${bg} border-purple-500 border-2 cursor-pointer transition-all ease-in-out duration-200`}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandControl;
