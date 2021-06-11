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
  const [layerStyle, setLayerStyle] = useState({
    fontSize,
    color: textColor,
  });

  useEffect(() => {
    setOption({
      ...option,
      x,
      y,
    });

    textRef.current.innerHTML = content;
  }, [content, x, y]);

  // Tinggi text layer selalu sama dengan text nya
  useEffect(() => {
    const text = textRef.current;
    const divHeight = pixelToNumber(getComputedStyle(text).height);

    if(divHeight > 0) {
      setOption({
        ...option,
        height: divHeight,
      });

      updateHeight(divHeight);
    }
  }, [content]);

  // Adjust font size to layer height
  const resizeLayer = (e, direction, ref, delta, position) => {
    // const newTextSize = ref.offsetHeight;
    // setLayerStyle({
    //   ...layerStyle,
    //   fontSize: newTextSize,
    // });
  };

  return (
    <div className="relative w-full h-full">
      <Rnd
        className="border-2 border-gray-400 border-opacity-20"
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
        // onResize={resizeLayer}
        onResizeStop={(e, direction, ref, delta, position) => {
          updateWidth(ref.style.width);
          updateHeight(ref.style.height);
          setOption({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
        minWidth={150}
        minHeight={50}
      >
        <div
          style={layerStyle}
          className="relative flex justify-center items-center w-full h-full text-center text-white"
        >
          <div
            className="w-full break-words"
            ref={textRef}
          >
          </div>
        </div>
      </Rnd>
    </div>
  );
};

export default RndLayer;
