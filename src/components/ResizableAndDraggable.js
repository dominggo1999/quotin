import { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

const ResizableAndDraggable = ({
  children, width, height, parentWidth, parentHeight, last, minWidth, minHeight,
}) => {
  const boxRef = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [Tx, setTX] = useState(0);
  const [Ty, setTY] = useState(0);
  const [w, setW] = useState(width);
  const [h, setH] = useState(height);
  const [init, setInit] = useState({ x: 0, y: 0 });
  const [disableDrag, setDisableDrag] = useState(false);

  const centerY = () => {
    const centerY = (parentHeight - h) / 2;
    setTY(centerY);
    setInit({
      ...init,
      y: centerY,
    });

    setY((window.innerHeight - h) / 2);
  };

  const centerX = () => {
    const centerX = (parentWidth - w) / 2;
    setTX(centerX);
    setInit({
      ...init,
      x: centerX,
    });
    setX((window.innerWidth - w) / 2);
  };

  const centerXY = () => {
    const centerX = (parentWidth - w) / 2;
    const centerY = (parentHeight - h) / 2;

    setTX(centerX);
    setTY(centerY);

    setInit({
      x: centerX,
      y: centerY,
    });

    // Update x and y value if needed
    setX((window.innerWidth - w) / 2);
    setY((window.innerHeight - h) / 2);
  };

  // Bagian dari resize
  useEffect(() => {
    const el = boxRef.current;

    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
  }, [w, h]);

  useEffect(() => {
    centerXY();
  }, []);

  const handleDragStop = () => {
    const el = boxRef.current;
    const coordinate = el.getBoundingClientRect();
    const transformY = el.computedStyleMap().get('transform')[0].y.value;
    const transformX = el.computedStyleMap().get('transform')[0].x.value;

    setX(coordinate.x);
    setY(coordinate.y);
    setTX(transformX);
    setTY(transformY);
    setInit({ x: transformX, y: transformY });
  };

  const stopDrag = () => {
    setDisableDrag(true);
  };

  const resize = (e) => {
    const getPosition = (e) => {
      const el = boxRef.current;
      const coordinate = el.getBoundingClientRect();

      const newWidth = e.pageX - coordinate.x;
      const newHeight = e.pageY - coordinate.y;

      if(newWidth >= minWidth || newHeight >= minHeight) {
        setW(newWidth);
        setH(newHeight);
      }
    };

    window.addEventListener('mousemove', getPosition);

    window.addEventListener('mouseup', (e) => {
      window.removeEventListener('mousemove', getPosition);
    });
  };

  const boxBoundaries = {
    minWidth,
    minHeight,
  };

  return (
    <>
      <div className={`absolute text-white z-40 ${last ? 'mt-20' : ''}`}>
        <button
          className=" rounded-lg bg-green-900 m-3.5 p-2"
          onClick={centerX}
        >centerX
        </button>
        <button
          className=" rounded-lg bg-green-900 m-3.5 p-2"
          onClick={centerY}
        >centerY
        </button>
        <button
          className=" rounded-lg bg-green-900 m-3.5 p-2"
          onClick={centerXY}
        >centerXY
        </button>
      </div>
      <Draggable
        axis="both"
        handle=".handle"
        scale={1}
        onStop={handleDragStop}
        disabled={disableDrag}
        position={init}
      >
        <div
          className="absolute handle bg-red-700  flex flex-col justify-center items-center select-none"
          style={boxBoundaries}
          ref={boxRef}
        >
          <span className="text-white block">Tx :{Tx} </span>
          <span className="text-white block">Ty :{Ty} </span>
          <span className="text-white block">X :{x} </span>
          <span className="text-white block">Y : {y} </span>
          <span className="text-white block">width : {w} px </span>
          <span className="text-white block">height : {h} px</span>

          <span
            role="button"
            className="react-resizable-handle react-resizable-handle-se"
            onMouseEnter={stopDrag}
            onMouseLeave={() => setDisableDrag(false)}
            onMouseDown={resize}
          >
          </span>
        </div>

      </Draggable>
    </>
  );
};

export default ResizableAndDraggable;
