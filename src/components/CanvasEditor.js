import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modifyText } from '../redux/text/textActions';
import RndLayer from './RndLayer';
import { alignLayer } from '../redux/layer/layerActions';

const CanvasEditor = () => {
  const resultRef = useRef();
  const dispatch = useDispatch();

  // Quote
  const {
    content, fontSize, textColor,
  } = useSelector((state) => state.text.quote);

  const {
    x, y, width, height,
  } = useSelector((state) => state.layer.quote);

  // TODO: Make canvas size global
  const [canvasSize, setCanvasSize] = useState({
    width: 450,
    height: 450,
  });

  const updateX = (value) => {
    dispatch(alignLayer('quote', 'x', value));
  };

  const updateY = (value) => {
    dispatch(alignLayer('quote', 'y', value));
  };

  const updateWidth = (value) => {
    dispatch(alignLayer('quote', 'width', value));
  };

  const updateHeight = (value) => {
    dispatch(alignLayer('quote', 'height', value));
  };

  return (
    <main
      className="w-full h-full flex justify-center items-center relative bg-gray-300 "
    >
      {/* shadow */}
      <div
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
        className="absolute  shadow-canvas"
      >
      </div>

      {/* Canvas */}
      <div
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
        id="canvas"
        ref={resultRef}
        className="relative z-10 overflow-hidden bg-gray-900"
      >
        <RndLayer
          content={content}
          canvasSize={canvasSize}
          x={x}
          y={y}
          width={width}
          height={height}
          updateX={updateX}
          updateY={updateY}
          updateWidth={updateWidth}
          updateHeight={updateHeight}
          fontSize={fontSize}
          textColor={textColor}
        />
      </div>
    </main>
  );
};

export default CanvasEditor;
