import { useSelector } from 'react-redux';
import DomToImage from '@yzfe/dom-to-image';
import React, { useState } from 'react';

const EditorHeader = () => {
  const { canvas, layer } = useSelector((state) => state);
  const { author, quote } = layer;
  const [loading, setLoading] = useState();

  const toImage = async () => {
    setLoading(true);
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

    try {
      await DomToImage.toPng(node, config).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-beautiful-quote.png';
        link.href = dataUrl;
        link.click();
        link.remove();
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="w-full px-10 flex justify-between items-center bg-purple-500 py-3">
      <h1 className="text-xl text-white font-black">Quotin</h1>
      <div className="flex">
        <button
          disabled={loading}
          onClick={!loading ? toImage : ()=>{}}
          className={`${loading && 'cursor-not-allowed'} w-24 bg-gray font-semibold p-2 rounded-lg bg-white hover:bg-[#0E1318] hover:text-white ml-2`}
        >
          {loading ? 'Loading...' : 'Download'}
        </button>
      </div>
    </nav>
  );
};

export default EditorHeader;
