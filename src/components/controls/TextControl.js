import { useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyLayerText, updateLayerLayout } from '../../redux/layer/layerActions';
import pixelToNumber from '../../util/pixelToNumber';
import OptionHeader from '../OptionHeader';

const TextControl = ({
  name, lineHeight, fontSize, canvasSize, width, height, text,
}) => {
  const dispatch = useDispatch();

  const updateText = (option, value) => {
    dispatch(modifyLayerText(name, option, value));
  };

  const updateLayout = (option, value) => {
    dispatch(updateLayerLayout(name, option, value));
  };

  const centerX = () => {
    const formatWidth = pixelToNumber(width);
    const newX = (canvasSize.width - formatWidth) / 2;

    updateLayout('x', newX);
  };

  const centerY = () => {
    const formatHeight = pixelToNumber(height);
    const newY = (canvasSize.height - formatHeight) / 2;

    updateLayout('y', newY);
  };

  const centerXY = () => {
    centerX();
    centerY();
  };

  const changeFontSize = (e) => {
    const int = parseInt(e.target.value, 10);
    updateText('fontSize', int);
  };

  const changeLineHeight = (e) => {
    const int = e.target.value / 100;
    updateText('lineHeight', int);
  };

  const alignText = (direction) => {
    updateText('textAlignment', direction);
  };

  const handleChange = (e) => {
    let str = (e.target.value);
    dispatch(modifyLayerText(name, 'text', str));

    // Get text (string not yet parsed to html)
    str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');

    str = str.replace(/\*(.*?)\*/gi, '<span style="font-weight: bold">$1</span>');

    str = str.replace(/\_(.*?)\_/gi, '<i>$1</i>');

    // Get parsed string
    dispatch(modifyLayerText(name, 'content', str));
  };

  return (
    <div className="w-full flex flex-col pb-10">
      <OptionHeader title={name} />
      <div className="w-full flex flex-col justify-center mb-[20px]">
        <textarea
          onChange={handleChange}
          name="gew"
          id="gewagewgaew"
          cols="30"
          rows="5"
          className="w-full max-h-[200px] p-3 rounded-sm focus:outline-none"
          value={text}
        >
        </textarea>
      </div>
      <button
        onClick={(e) => alignText('left')}
        className="bg-red-700 text-white mb-5"
      >Align Text Left
      </button>
      <button
        onClick={(e) => alignText('right')}
        className="bg-red-700 text-white mb-5"
      >Align Text Right
      </button>
      <button
        onClick={(e) => alignText('center')}
        className="bg-red-700 text-white mb-5"
      >Align Text Center
      </button>
      <button
        onClick={(e) => alignText('justify')}
        className="bg-red-700 text-white mb-5"
      >Align Text Justify
      </button>
      <button
        onClick={centerX}
        className="bg-black text-white mb-5"
      >Horizontal alignment
      </button>
      <button
        onClick={centerY}
        className="bg-black text-white mb-5"
      >Vertical alignment
      </button>
      <button
        onClick={centerXY}
        className="bg-black text-white mb-5"
      >Center alignment
      </button>
      <p className="text-white text-center">{fontSize}</p>
      <input
        type="range"
        min="10"
        max="100"
        onInput={changeFontSize}
        value={fontSize}
      />
      <p>Font size</p>

      <p className="text-white text-center">{lineHeight}</p>
      <input
        type="range"
        min="50"
        max="200"
        onInput={changeLineHeight}
        value={lineHeight * 100}
      />
      <p>Line height</p>
    </div>
  );
};

export default TextControl;
