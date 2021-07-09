import { useDispatch } from 'react-redux';
import OptionHeader from '../OptionHeader';
import { setCanvasAspectRatio, setCanvasOrientation } from '../../redux/canvas/canvasActions';

const Sub = ({ sub, resizeCanvas }) => {
  const { header, sizes } = sub;

  return (
    <div className="text-white py-2">
      <h3 className="mb-1 font-bold">{header}</h3>
      {
        sizes.map((size) => {
          return (
            <p
              key={`size_${size.name}`}
              className="cursor-pointer italic text-purple-500"
              onClick={() => resizeCanvas(size.size)}
            >{size.name}
            </p>
          );
        })
      }
    </div>
  );
};

const CanvasSizeControl = ({ sizeOptions }) => {
  const dispatch = useDispatch();
  const { panel, sub } = sizeOptions;

  const resizeCanvas = (aspectRatio) => {
    // 0 -> w
    // 1 -> h
    const newOrientation = aspectRatio[0] > aspectRatio[1] ? 'landscape' : 'potrait';

    dispatch(setCanvasAspectRatio(aspectRatio));
    dispatch(setCanvasOrientation(newOrientation));
  };

  return (
    <div className="w-full py-5 select-none">
      <OptionHeader title={panel} />
      {
        sub.map((sub) => {
          return (
            <Sub
              key={`sub ${sub.header}`}
              sub={sub}
              resizeCanvas={resizeCanvas}
            />
          );
        })
      }
    </div>
  );
};

export default CanvasSizeControl;
