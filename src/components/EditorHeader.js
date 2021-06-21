import html2canvas from 'html2canvas';
import { useSelector, useDispatch } from 'react-redux';
import useCanvasSize from '../hooks/useCanvasSize';

const EditorHeader = () => {
  const canvas = useSelector((state) => state.canvas);

  const downloadImage = () => {
    const c = document.getElementById('canvas');

    html2canvas(c, {
      scale: 5,
      backgroundColor: null,
      useCORS: true,
    }).then((canvas) => {
      const imageURL = canvas.toDataURL('image/png', 1);
      const a = document.createElement('a');
      a.href = imageURL;
      a.download = 'your beautiful quote';
      a.click();
    });

    // const scale = 5;

    // const w = canvasSize.width;
    // const h = canvasSize.height;
    // const canvas = document.createElement('canvas');
    // canvas.width = w * scale;
    // canvas.height = h * scale;
    // canvas.style.width = `${w}px`;
    // canvas.style.height = `${h}px`;
    // const context = canvas.getContext('2d');
    // context.scale(scale, scale);
    // html2canvas(c, {
    //   canvas,
    //   backgroundColor: null,
    //   useCORS: true,
    // }).then((canvas) => {
    //   const imageURL = canvas.toDataURL('image/png');
    //   const a = document.createElement('a');
    //   a.href = imageURL;
    //   a.download = 'your beautiful quote';
    //   a.click();
    // });
  };

  return (
    <nav className="w-full px-10 flex justify-between items-center bg-blue-700 py-3">
      <h1 className="text-xl text-white font-black">Quotin</h1>
      <button
        onClick={downloadImage}
        className="bg-gray font-semibold p-2 rounded-lg bg-white"
      >Download
      </button>
    </nav>
  );
};

export default EditorHeader;
