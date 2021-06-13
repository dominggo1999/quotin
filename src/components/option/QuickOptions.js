import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionHeader from '../OptionHeader';
import TextContentControl from '../controls/TextContentControl';
import { updateLayerLayout, modifyLayerText } from '../../redux/layer/layerActions';
import pixelToNumber from '../../util/pixelToNumber';
import TextControl from '../controls/TextControl';
import useMapStateToArray from '../../hooks/useMapStateToArray';

const QuickOption = () => {
  const dispatch = useDispatch();

  const layersState = useSelector((state) => state.layer);
  const layerInstances = useMapStateToArray(layersState);

  // const changeQuoteContent = (content) => {
  //   dispatch(modifyText('quote', 'content', content));
  // };

  // const changeQuoteText = (text) => {
  //   dispatch(modifyText('quote', 'text', text));
  // };

  // TODO: Make canvas size global
  const [canvasSize, setCanvasSize] = useState({
    width: 450,
    height: 450,
  });

  return (
    <div className="px-5 w-full flex flex-col justify-center">
      {layerInstances && layerInstances.map((item) => {
        return (
          <TextControl
            canvasSize={canvasSize}
            key={item.id}
            name={item.name}
            lineHeight={item.lineHeight}
            fontSize={item.fontSize}
            width={item.width}
            height={item.height}
          />
        );
      })}
    </div>
  );
};

export default QuickOption;
