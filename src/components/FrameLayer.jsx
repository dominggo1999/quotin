import React from 'react';
import useLayerOrder from '../hooks/useLayerOrder';

const FrameLayer = ({ item }) => {
  const {
    offset,
    width,
    opacity,
    display,
    color,
    name,
  } = item;

  const zIndex = useLayerOrder(name);

  const frameStyle = {
    borderWidth: `${width}px`,
    borderColor: color,
    opacity,
    display: !display ? 'none' : 'block',
    width: '100%',
  };

  if(!display) {
    return null;
  }

  return (
    <div
      className="w-full h-full flex items center justify-center absolute top-0 left-0"
      style={{
        padding: `${offset}%`,
        pointerEvents: 'none',
        zIndex,
      }}
    >
      <div
        style={frameStyle}
      >
      </div>
    </div>
  );
};

export default FrameLayer;
