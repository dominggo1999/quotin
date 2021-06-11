import { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import pixelToNumber from '../util/pixelToNumber';

const RndLayer = ({
  x, y, width, height, content, updateX, updateY, updateWidth, updateHeight, fontSize, textColor, className,
}) => {
  const textRef = useRef(null);
  const [option, setOption] = useState({
    x, y, width, height,
  });

  const layerStyle = {
    fontSize,
    color: textColor,
  };

  useEffect(() => {
    setOption({
      ...option,
      x,
      y,
    });

    textRef.current.innerHTML = content;
  }, [content, x, y]);

  // Di awal jadikan tinggi div sesuai dengan text
  useEffect(() => {
    const text = textRef.current;
    const divHeight = pixelToNumber(getComputedStyle(text).height);

    if(divHeight > 0) {
      setOption({
        ...option,
        height: divHeight,
      });

      updateHeight(fontSize);
    }
  }, [content]);

  return (
    <div className="relative w-full h-full">
      <Rnd
        className="border-4 border-red-400"
        enableResizing={{
          top: false,
          right: true,
          bottom: false,
          left: true,
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
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
          updateWidth(ref.style.width);
          updateHeight(ref.style.height);
          setOption({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
      >
        <div
          style={layerStyle}
          className="flex justify-center items-center w-full h-full text-center text-white"
        >
          <div
            ref={textRef}
          >
          </div>
        </div>
      </Rnd>
    </div>
  );
};

export default RndLayer;
