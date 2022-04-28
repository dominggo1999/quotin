import { useSelector } from 'react-redux';
import DomToImage from '@yzfe/dom-to-image';
import React from 'react';

const EditorHeader = () => {
  const { canvas, layer } = useSelector((state) => state);
  const { author, quote } = layer;

  const toImage = async () => {
    const node = document.getElementById('canvas');

    // Get target size
    const targetHeight = canvas.aspectRatio[1];
    const targetWidth = canvas.aspectRatio[0];

    // Get node current size
    const { height: nodeHeight } = node.getBoundingClientRect();

    const scale = targetHeight / nodeHeight;

    const style = {
      transform: `scale(${scale})`,
      'transform-origin': 'top left',
    };

    const config = {
      height: targetHeight,
      width: targetWidth,
      style,
      fontFamily: [author.fontFamily, quote.fontFamily],
    };

    await DomToImage.toPng(node, config).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'my-beautiful-quote.png';
      link.href = dataUrl;
      link.click();
      link.remove();
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
