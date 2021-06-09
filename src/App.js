import { useState, useRef, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import ResizableAndDraggable from './components/ResizableAndDraggable';

const App = () => {
  return (
    <div
      className="overflow-hidden w-full h-screen flex justify-center items-center relative"
    >
      <div className="relative w-[600px] h-[600px] overflow-hidden bg-gray-900">
        <ResizableAndDraggable
          width={200}
          height={200}
          parentWidth={600}
          parentHeight={600}
          minWidth={100}
          minHeight={100}
        />
        {/* <ResizableAndDraggable
          width={200}
          height={200}
          parentWidth={600}
          parentHeight={600}
          last
        /> */}
      </div>
    </div>
  );
};

export default App;
