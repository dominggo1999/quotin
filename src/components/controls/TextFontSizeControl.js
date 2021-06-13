import { useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyText } from '../../redux/text/textActions';

const TextFontSizeControl = () => {
  const dispatch = useDispatch();

  const { fontSize, lineHeight } = useSelector((state) => state.text.quote);
  const changeFontSize = (e) => {
    const int = parseInt(e.target.value, 10);
    dispatch(modifyText('quote', 'fontSize', int));
  };
  const changeLineHeight = (e) => {
    e.stopPropagation();
    const int = e.target.value / 100;
    dispatch(modifyText('quote', 'lineHeight', int));
  };

  return (
    <>
      <p>font size</p>
      <p className="text-white text-center">{fontSize}</p>
      <input
        type="range"
        min="10"
        max="100"
        onInput={changeFontSize}
        value={fontSize}
      />
      <p>Line height</p>
      <p className="text-white text-center">{lineHeight}</p>
      <input
        type="range"
        min="50"
        max="200"
        onInput={changeLineHeight}
        value={lineHeight * 100}
      />
    </>
  );
};

export default TextFontSizeControl;
