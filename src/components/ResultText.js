import { useEffect, useRef } from 'react';
import pixelToNumber from '../util/pixelToNumber';

const ResultText = ({ item, canvasSize, scale }) => {
  const {
    x, y, width, height, content, fontSize, textColor, lineHeight, textAlignment, uppercase, shadow, letterSpacing, fontFamily,
  } = item;

  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.innerHTML = content;
  }, [content]);

  const tX = x * scale;
  const tY = y * scale;
  console.log(`transform(${tX}px,${tY})`);

  const layerStyle = {
    color: textColor,
    fontSize: fontSize * scale,
    lineHeight,
    textAlign: textAlignment,
    textTransform: uppercase ? 'uppercase' : 'none',
    textShadow: shadow ? 'rgba(0, 0, 0, 0.9) 0.05em 0.05em 0.15em' : 'none',
    letterSpacing: `${letterSpacing}em`,
    fontFamily,
  };

  return (
    <div
      style={{
        top: 0,
        left: 0,
        position: 'absolute',
        width: pixelToNumber(width) * scale,
        height: 'auto',
        zIndex: 8000,
        transform: `translate(${tX}px,${tY}px)`,
      }}
    >
      <div className="border-2 relative border-transparent">
        <div
          style={{
            ...layerStyle,
          }}
          className="break-words py-2 px-1 select-none pointer-events-none"
          ref={textRef}
        >
        </div>
      </div>
    </div>
  );
};

export default ResultText;
