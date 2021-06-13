import { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import pixelToNumber from '../util/pixelToNumber';

const RndLayer = ({
  x, y, width, height, content, updateX, updateY, updateWidth, updateHeight, fontSize, textColor, className, lineHeight,
}) => {
  const textRef = useRef(null);
  const [option, setOption] = useState({
    x, y, width, height: 'auto',
  });

  const layerStyle = {
    color: textColor,
    fontSize,
    lineHeight,
  };

  // Kalu ukuran font berubah
  useEffect(() => {
    const text = textRef.current;
    const textHeight = pixelToNumber(getComputedStyle(text).height);
    const textWidth = pixelToNumber(getComputedStyle(text).width);

    updateHeight(textHeight);
    updateWidth(textWidth);
  }, [fontSize, content, lineHeight]);

  // Init posisi dan content
  useEffect(() => {
    setOption({
      ...option,
      x,
      y,
    });

    textRef.current.innerHTML = content;
  }, [content, x, y]);

  return (
    <div className="relative">
      <Rnd
        className="border-2 border-opacity-0 border-transparent hover:border-2 hover:border-gray-400 hover:border-opacity-20"
        enableResizing={{
          top: false,
          right: true,
          bottom: false,
          left: true,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        size={{ width: option.width, height: option.height }}
        position={{
          ...option,
          x: option.x,
          y: option.y,
        }}
        onDragStop={(e, d) => {
          updateX(d.x);
          updateY(d.y);
          setOption({
            ...option,
            x: d.x,
            y: d.y,
          });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          updateHeight(ref.style.width);
          updateWidth(ref.style.width);
          setOption({
            ...option,
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
      >
        <div
          className="relative flex w-full text-center text-white"
        >
          <div
            style={layerStyle}
            className="w-full h-full break-words"
            ref={textRef}
          >
          </div>
        </div>
      </Rnd>
    </div>
  );
};

export default RndLayer;
