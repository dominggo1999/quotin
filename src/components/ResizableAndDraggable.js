import { useState, useRef } from 'react';

const ResizableAndDraggable = ({
  width, height, minWidth, minHeight, x, y, parentWidth, parentHeight,
}) => {
  const boxRef = useRef(null);
  const [w, setW] = useState(width);
  const [h, setH] = useState(height);
  const [left, setLeft] = useState(x);
  const [top, setTop] = useState(y);

  const boxStyle = {
    width: w,
    height: h,
    minWidth,
    minHeight,
    left,
    top,
  };

  const drag = (e) => {
    const el = boxRef.current;
    const prevX = e.pageX;
    const prevY = e.pageY;
    const move = (e) => {
      const newX = e.pageX;
      const newY = e.pageY;

      const deltaX = newX - prevX;
      const deltaY = newY - prevY;

      setLeft(deltaX + left);
      setTop(deltaY + top);
    };

    window.addEventListener('mousemove', move);

    window.addEventListener('mouseup', (e) => {
      window.removeEventListener('mousemove', move);
    });
  };

  return (
    <div
      ref={boxRef}
      role="banner"
      onMouseDown={drag}
      className="absolute bg-blue-700"
      style={boxStyle}
    >
    </div>
  );
};

export default ResizableAndDraggable;
