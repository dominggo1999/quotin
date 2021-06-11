import { useRef } from 'react';
import { useSelector } from 'react-redux';
import RndLayer from './RndLayer';

const CanvasEditor = () => {
  const resultRef = useRef();
  const { quoteContent, quoteText } = useSelector((state) => state.quote);

  return (
    <main
      className="overflow-hidden w-full h-full flex justify-center items-center relative bg-gray-400"
    >
      {/* Canvas */}
      <div
        ref={resultRef}
        className="relative w-[450px] h-[450px] overflow-hidden bg-gray-900"
      >
        <div className="relative w-full h-full">
          <RndLayer
            content={quoteContent}
          />

        </div>
      </div>
    </main>
  );
};

export default CanvasEditor;
