import { useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyLayerText, updateLayerLayout } from '../../redux/layer/layerActions';
import pixelToNumber from '../../util/pixelToNumber';

const TextControl = ({
  name, lineHeight, fontSize, canvasSize, width, height,
}) => {
  const dispatch = useDispatch();

  const centerX = () => {
    const formatWidth = pixelToNumber(width);
    const newX = (canvasSize.width - formatWidth) / 2;

    dispatch(updateLayerLayout(name, 'x', newX));
  };

  const centerY = () => {
    const formatHeight = pixelToNumber(height);
    const newY = (canvasSize.height - formatHeight) / 2;

    dispatch(updateLayerLayout(name, 'y', newY));
  };

  const centerXY = () => {
    centerX();
    centerY();
  };

  const changeFontSize = (e) => {
    const int = parseInt(e.target.value, 10);
    dispatch(modifyLayerText(name, 'fontSize', int));
  };
  const changeLineHeight = (e) => {
    const int = e.target.value / 100;
    dispatch(modifyLayerText(name, 'lineHeight', int));
  };

  return (
    <>

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
    </>
  );
};

export default TextControl;
