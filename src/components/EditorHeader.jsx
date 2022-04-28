import { useSelector } from 'react-redux';
import DomToImage from '@yzfe/dom-to-image';
import React from 'react';
import useCanvasSize from '../hooks/useCanvasSize';

const EditorHeader = () => {
  const { canvas, layer } = useSelector((state) => state);
  const canvasSize = useCanvasSize(canvas);
  const { author, quote } = layer;

  const toImage = async () => {
    let height;
    let width;

    if(canvas.aspectRatio[1] === 1) {
      height = canvas.aspectRatio[1] * 2000;
      width = canvas.aspectRatio[0] * 2000;
    }else{
      height = canvas.aspectRatio[1];
      width = canvas.aspectRatio[0];
    }

    const scale = height / canvasSize.height;

    // Scale image to the desire size
    const node = document.getElementById('canvas');

    const config = {
      height,
      width,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${canvasSize.width}px`,
        height: `${canvasSize.height}px`,
      },
      fontFamily: [author.fontFamily, quote.fontFamily],
    };

    await DomToImage.toPng(node, config).then((dataUrl) => {
      // const imageURL = canvas.toDataURL('image/png');
      // const a = document.createElement('a');
      const link = document.createElement('a');
      link.download = 'my-beautiful-quote.png';
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <nav className="w-full px-10 flex justify-between items-center bg-purple-500 py-3">
      <h1 className="text-xl text-white font-black">Quotin</h1>
      <div className="flex">
        <button
          onClick={toImage}
          className="bg-gray font-semibold p-2 rounded-lg bg-white ml-2"
        >Download
        </button>
      </div>
    </nav>
  );
};

export default EditorHeader;
