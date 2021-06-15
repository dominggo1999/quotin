import { useState, useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';
import { useDispatch } from 'react-redux';
import GoogleFontPicker from './GoogleFontPicker';
import { modifyLayerText } from '../../redux/layer/layerActions';

const API_KEY = process.env.REACT_APP_GOOGLE_FONT_API;

const FontPicker = ({ closeBrowser, name, activeFont }) => {
  const [activeFontFamily, setActiveFontFamily] = useState(activeFont);
  const [test, setTest] = useState(activeFont);
  const [fontCategory, setFontCategory] = useState('');

  const changeCategory = (category) => {
    setFontCategory(category);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(modifyLayerText(name, 'fontFamily', test));
  }, [test]);

  return (
    <div className="text-white w-full relative px-5">
      <button
        className=" py-1 px-5 text-base bg-purple-500 rounded-lg"
        onClick={closeBrowser}
      >Back
      </button>
      <GoogleFontPicker
        name={name}
        apiKey={API_KEY}
        activeFontFamily={activeFontFamily}
        onChange={(nextFont) => setActiveFontFamily(nextFont.family)}
        limit={200}
        categories={fontCategory}
        sort="alphabet"
        changeFont={(f) => setTest(f)}
        changeCategory={changeCategory}
        pickerId={`${name}fontPicker`}
        fontCategory={fontCategory}
      />
    </div>
  );
};

export default FontPicker;
