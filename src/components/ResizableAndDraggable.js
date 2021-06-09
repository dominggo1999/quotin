import { useState, useRef } from 'react';

const ResizableAndDraggable = ({
  width, height, minWidth, minHeight, x, y, parentWidth, parentHeight,
}) => {
  const boxRef = useRef(null);
  const [disableDrag, setDisableDrag] = useState(false);
  const [w, setW] = useState(width);
  const [h, setH] = useState(height);
  const [left, setLeft] = useState(x);
  const [top, setTop] = useState(y);
  const axis = ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'];

  const boxStyle = {
    width: w,
    height: h,
    minWidth,
    minHeight,
    left,
    top,
  };

  const drag = (e) => {
    if(disableDrag) return;

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

  // Disable drag event when resizing
  const stopDrag = () => {
    setDisableDrag(true);
  };

  const enableDrag = () => {
    setDisableDrag(false);
  };

  const resize = (e, axis) => {
    const prevCursorX = e.pageX;
    const prevCursorY = e.pageY;

    const calculate = (e) => {
      const el = boxRef.current;
      const rect = el.getBoundingClientRect();
      const currentCursorX = e.pageX;
      const currentCursorY = e.pageY;

      let newWidth;
      let newHeight;
      let newLeft;
      let newTop;

      if(axis === 'se') {
        newWidth = currentCursorX - prevCursorX + w;
        newHeight = currentCursorY - prevCursorY + h;
      }

      if(axis === 's') {
        newWidth = w;
        newHeight = currentCursorY - prevCursorY + h;
      }

      if(axis === 'e') {
        newWidth = currentCursorX - prevCursorX + w;
        newHeight = h;
      }

      if(axis === 'sw') {
        newHeight = currentCursorY - prevCursorY + h;

        newWidth = prevCursorX - currentCursorX + w;

        newLeft = currentCursorX - (window.innerWidth - parentWidth) / 2;
      }

      if(axis === 'w') {
        newWidth = prevCursorX - currentCursorX + w;

        newHeight = h;
        console.log(newWidth);

        if(newWidth >= minWidth) {
          newLeft = currentCursorX - (window.innerWidth - parentWidth) / 2;
        }
      }

      if(axis === 'nw') {
        newWidth = prevCursorX - currentCursorX + w;

        newHeight = prevCursorY - currentCursorY + h;

        newTop = currentCursorY - (window.innerHeight - parentHeight) / 2;

        newLeft = currentCursorX - (window.innerWidth - parentWidth) / 2;
      }

      if(axis === 'n') {
        newWidth = w;

        newHeight = prevCursorY - currentCursorY + h;

        newTop = currentCursorY - (window.innerHeight - parentHeight) / 2;

        newLeft = left;
      }

      if(axis === 'ne') {
        newWidth = currentCursorX - prevCursorX + w;

        newHeight = prevCursorY - currentCursorY + h;

        newTop = currentCursorY - (window.innerHeight - parentHeight) / 2;

        newLeft = left;
      }

      if(newLeft) {
        setLeft(newLeft);
      }

      if(newTop) {
        setTop(newTop);
      }

      setW(newWidth);
      setH(newHeight);
    };

    window.addEventListener('mousemove', calculate);

    window.addEventListener('mouseup', (e) => {
      window.removeEventListener('mousemove', calculate);
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
      {axis.map((item) => {
        return (
          <span
            key={item}
            role="button"
            className={`react-resizable-handle react-resizable-handle-${item}`}
            onMouseEnter={stopDrag}
            onMouseLeave={enableDrag}
            onMouseDown={(e) => resize(e, item)}
            axis={item}
          >
          </span>
        );
      })}
    </div>
  );
};

export default ResizableAndDraggable;
