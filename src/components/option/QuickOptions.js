import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionHeader from '../OptionHeader';
import TextContentControl from '../controls/TextContentControl';
import { modifyText } from '../../redux/text/textActions';
import { alignLayer } from '../../redux/layer/layerActions';
import pixelToNumber from '../../util/pixelToNumber';

const QuickOption = () => {
  const dispatch = useDispatch();

  const { text } = useSelector((state) => state.text.quote);
  const { width, height } = useSelector((state) => state.layer.quote);

  const changeQuoteContent = (content) => {
    dispatch(modifyText('quote', 'content', content));
  };

  const changeQuoteText = (text) => {
    dispatch(modifyText('quote', 'text', text));
  };

  // TODO: Make canvas size global
  const [canvasSize, setCanvasSize] = useState({
    width: 450,
    height: 450,
  });

  const centerX = () => {
    const formatWidth = pixelToNumber(width);
    const newX = (canvasSize.width - formatWidth) / 2;

    dispatch(alignLayer('quote', 'x', newX));
  };

  const centerY = () => {
    const formatHeight = pixelToNumber(height);
    const newY = (canvasSize.height - formatHeight) / 2;

    dispatch(alignLayer('quote', 'y', newY));
  };

  const centerXY = () => {
    centerX();
    centerY();
  };

  return (
    <div className="px-5 w-full flex flex-col justify-center">
      <OptionHeader title="Quote" />
      <TextContentControl
        changeContent={changeQuoteContent}
        changeText={changeQuoteText}
        text={text}
      />
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
    </div>
  );
};

export default QuickOption;
