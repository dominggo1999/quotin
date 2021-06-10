import { useRef } from 'react';
import { Rnd } from 'react-rnd';
import RndLayer from './RndLayer';

const CanvasEditor = () => {
  const resultRef = useRef();

  return (
    <main
      className="overflow-hidden w-full h-full flex justify-center items-center relative bg-gray-400"
    >
      <div
        ref={resultRef}
        className="relative w-[450px] h-[450px] overflow-hidden bg-gray-900"
      >
        <div className="relative w-full h-full">
          <RndLayer>

          </RndLayer>
        </div>
      </div>
    </main>
  );
};

export default CanvasEditor;
