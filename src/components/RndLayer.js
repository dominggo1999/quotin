import { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import pixelToNumber from '../util/pixelToNumber';
import ResizeHandler from './controls/ResizeHandler';

const RndLayer = ({
  className, name, x, y, width, height, content, updateX, updateY, updateWidth, updateHeight, fontSize, textColor, lineHeight, textAlignment, uppercase, shadow, letterSpacing, highlightColor, fontFamily, setActive, activeLayerId,
}) => {
  const textRef = useRef(null);
  const [option, setOption] = useState({
    x, y, width, height,
  });
  const [borderOpacity, setBorderOpacity] = useState(0);
  const [noHover, setNoHover] = useState(false);
  const [enableResizing, setEnableResizing] = useState({
    top: false,
    right: false,
    left: false,
    bottom: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
  });

  const layerStyle = {
    color: textColor,
    fontSize,
    lineHeight,
    textAlign: textAlignment,
    textTransform: uppercase ? 'uppercase' : 'none',
    textShadow: shadow ? 'rgba(0, 0, 0, 0.9) 0.05em 0.05em 0.15em' : 'none',
    letterSpacing: `${letterSpacing}em`,
    fontFamily,
  };

  // activeLayer id
  useEffect(() => {
    if(activeLayerId !== `${name}_layer`) {
      setBorderOpacity(0);
      setEnableResizing({
        ...enableResizing,
        left: false,
        right: false,
      });
    }
  }, [activeLayerId]);

  // Kalu ukuran font berubah
  useEffect(() => {
    const text = textRef.current;
    const textHeight = pixelToNumber(getComputedStyle(text).height);

    setOption({
      ...option,
      height: 'auto',
    });

    updateHeight(textHeight);
  }, [fontSize, content, lineHeight, letterSpacing, uppercase, fontFamily]);

  // Init posisi dan content
  useEffect(() => {
    // If layer is align (centerX, centerY, centerXY)
    // Update X
    setOption({
      ...option,
      x,
      y,
    });

    // Update text
    textRef.current.innerHTML = content;
    const text = textRef.current;

    // Update height
    const textHeight = pixelToNumber(getComputedStyle(text).height);
    updateHeight(textHeight);
  }, [content, x, y]);

  const handleClick = (e) => {
    setEnableResizing({
      ...enableResizing,
      left: true,
      right: true,
    });
    setBorderOpacity(100);
  };

  const handleDragStart = (e) => {
    setBorderOpacity(100);
  };

  const handleDragStop = (e, d) => {
    updateX(d.x);
    updateY(d.y);
    setOption({
      ...option,
      x: d.x,
      y: d.y,
    });

    setEnableResizing({
      ...enableResizing,
      left: true,
      right: true,
    });
  };

  return (
    <div className="relative">
      <Rnd
        className=" z-50"
        enableResizing={enableResizing}
        size={{ width: option.width, height: option.height }}
        position={{
          x: option.x,
          y: option.y,
        }}
        onDragStop={handleDragStop}
        onDragStart={handleDragStart}
        onResizeStop={(e, direction, ref, delta, position) => {
          const text = textRef.current;
          const textHeight = pixelToNumber(getComputedStyle(ref).height);
          updateHeight(textHeight);
          updateWidth(ref.style.width);
          setOption({
            ...option,
            width: ref.style.width,
            height: ref.style.height, // auto
            ...position,
          });
          setBorderOpacity(100);
        }}
        resizeHandleComponent={{
          left: <ResizeHandler side="left" />,
          right: <ResizeHandler side="right" />,
        }}
      >
        <div
          role="region"
          className={`relative flex w-full text-center text-white border-2 ${borderOpacity ? 'border-opacity-100' : 'border-opacity-0'} border-layer hover:border-opacity-100`}
          onClick={handleClick}
          onTouchStart={handleClick}
          id={`${name}_layer`}
        >
          <div
            style={layerStyle}
            className="w-full h-full break-words py-2 px-1 select-none pointer-events-none"
            ref={textRef}
          >
          </div>
        </div>
      </Rnd>
    </div>
  );
};

export default RndLayer;
