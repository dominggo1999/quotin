import html2canvas from 'html2canvas';
import { useSelector, useDispatch } from 'react-redux';
import DomToImage from 'dom-to-image';
import useCanvasSize from '../hooks/useCanvasSize';
import { setCanvasAspectRatio, setCanvasOrientation } from '../redux/canvas/canvasActions';

const EditorHeader = () => {
  const { canvas, layer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const downloadImage = () => {
    const c = document.getElementById('canvas');

    html2canvas(c, {
      scale: 5,
      backgroundColor: null,
      useCORS: true,
    }).then((canvas) => {
      const imageURL = canvas.toDataURL('image/png');
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

  const toImage = async () => {
    const scale = 5;
    const node = document.getElementById('canvas');

    await DomToImage.toPng(node, {
      height: node.offsetHeight * scale,
      width: node.offsetWidth * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${node.offsetWidth}px`,
        height: `${node.offsetHeight}px`,
      },
    }).then((dataUrl) => {
      // const imageURL = canvas.toDataURL('image/png');
      // const a = document.createElement('a');
      const link = document.createElement('a');
      link.download = 'my-beautiful-quote.png';
      link.href = dataUrl;
      link.click();
    });
  };

  const logTemplate = () => {
    console.log({
      canvas,
      layer,
    });
  };

  const resizeCanvas = () => {
    dispatch(setCanvasAspectRatio([2, 1]));
    dispatch(setCanvasOrientation('landscape'));
  };

  return (
    <nav className="w-full px-10 flex justify-between items-center bg-blue-700 py-3">
      <h1 className="text-xl text-white font-black">Quotin</h1>
      <div className="flex">
        <button
          onClick={toImage}
          className="bg-gray font-semibold p-2 rounded-lg bg-white ml-2"
        >Download
        </button>
        <button
          onClick={logTemplate}
          className="bg-gray font-semibold p-2 rounded-lg bg-white ml-2"
        >Log State
        </button>
        {/* <button
          onClick={resizeCanvas}
          className="bg-gray font-semibold p-2 rounded-lg bg-white ml-2"
        >Resize Canvas
        </button> */}
      </div>
    </nav>
  );
};

export default EditorHeader;
