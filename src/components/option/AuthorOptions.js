import { useState } from 'react';
import { useSelector } from 'react-redux';
import TextControl from '../controls/TextControl';
import useMapStateToArray from '../../hooks/useMapStateToArray';
import FontPicker from '../controls/FontPicker';

const AuthorOptions = ({ canvasSize }) => {
  const layersState = useSelector((state) => state.layer);
  const layerInstances = useMapStateToArray(layersState);
  const [showBrowser, setShowBrowser] = useState(false);

  const openBrowser = () => {
    setShowBrowser(true);
  };

  const closeBrowser = () => {
    setShowBrowser(false);
  };

  if(showBrowser) {
    const activeFontFamily = layerInstances.filter((i) => i.name === 'author')[0].fontFamily;
    return (
      <FontPicker
        name="author"
        closeBrowser={closeBrowser}
        activeFont={activeFontFamily}
      />
    );
  }

  return (
    <div className="px-5 w-full flex flex-col justify-center">
      {layerInstances && layerInstances.filter((i) => i.name === 'author').map((item) => {
        return (
          <TextControl
            canvasSize={canvasSize}
            key={item.id}
            name={item.name}
            lineHeight={item.lineHeight}
            fontSize={item.fontSize}
            width={item.width}
            height={item.height}
            text={item.text}
            uppercase={item.uppercase}
            shadow={item.shadow}
            highlightColor={item.highlightColor}
            textColor={item.textColor}
            letterSpacing={item.letterSpacing}
            openBrowser={openBrowser}
            fontFamily={item.fontFamily}
          />
        );
      })}
    </div>
  );
};

export default AuthorOptions;
