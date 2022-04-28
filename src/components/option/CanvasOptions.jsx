import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCanvasAspectRatio, setCanvasOrientation } from '../../redux/canvas/canvasActions';
import { canvasSizeData } from '../../data/canvasSizeData';
import CanvasSizeControl from '../controls/CanvasSizeControl';

// Move this to util
const getOrientation = (aspectRatio) => {
  const w = aspectRatio[0];
  const h = aspectRatio[1];

  if(w > h) {
    return 'landscape';
  }

  return 'potrait';
};

const CanvasOptions = () => {
  const dispatch = useDispatch();
  const canvas = useSelector((state) => state.canvas);

  const resizeCanvas = (newAspectRatio) => {
    const newOrientation = getOrientation(newAspectRatio);

    dispatch(setCanvasAspectRatio(newAspectRatio));
    dispatch(setCanvasOrientation(newOrientation));
  };

  const rotateCanvas = () => {
    const { aspectRatio } = canvas;

    const newAspectRatio = aspectRatio.reverse();
    resizeCanvas(newAspectRatio);
  };

  const fitCanvasToImage = () => {
    const { imageAspectRatio } = canvas;
    const newAspectRatio = [imageAspectRatio, 1];

    resizeCanvas(newAspectRatio);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">

      {/* Options */}
      <div className="w-full text-white px-5 flex flex-col">
        <button
          className="p-2 rounded-lg bg-purple-500 mb-3"
          onClick={rotateCanvas}
        >Rotate Canvas
        </button>
        <button
          className="p-2 rounded-lg bg-purple-500 mb-3"
          onClick={fitCanvasToImage}
        >Fit Canvas To Image
        </button>
      </div>
      {/* Size */}
      <div className="custom-scrollbar overflow-y-auto w-full px-5">
        {
          canvasSizeData.map((item) => {
            return (
              <CanvasSizeControl
                key={`panel ${item.panel}`}
                sizeOptions={item}
                resizeCanvas={resizeCanvas}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default CanvasOptions;
