import React from 'react';

const useCanvasSize = (canvas) => {
  const {
    aspectRatio, baseHeight,
    baseWidth,
    orientation,
  } = canvas;

  let width = baseWidth;
  let height = baseHeight;

  if(orientation === 'potrait') {
    width = (aspectRatio[0] / aspectRatio[1]) * height;
  } else if(orientation === 'landscape') {
    height = (aspectRatio[1] / aspectRatio[0]) * width;
  }

  return {
    width,
    height,
  };
};

export default useCanvasSize;
