import { useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';

const RndLayer = ({ content, className }) => {
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.innerHTML = content;
  }, [content]);

  return (
    <Rnd
      className="border-4 border-red-400"
      enableResizing={{
        top: false,
        right: true,
        bottom: false,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      default={{
        x: 0,
        y: 0,
        width: 430,
        height: 430,
      }}
    >
      <div className="flex justify-center items-center w-full h-full text-center text-white text-6xl">
        <span ref={textRef}></span>
      </div>
    </Rnd>
  );
};

export default RndLayer;
