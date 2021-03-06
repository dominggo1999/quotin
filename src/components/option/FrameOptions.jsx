import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useMapStateToArray from '../../hooks/useMapStateToArray';
import FrameControl from '../controls/FrameControl';

const FrameOptions = () => {
  const layersState = useSelector((state) => state.layer);
  const layerInstances = useMapStateToArray(layersState);
  const [showBrowser, setShowBrowser] = useState(false);
  return (
    <div className="custom-scrollbar w-full h-full flex flex-col items-center overflow-y-scroll overflow-x-hidden">
      <div className="px-5 w-full flex items-center flex-col">
        {
          layerInstances && layerInstances.filter((i) => i.type === 'frame').map((item) => {
            return (
              <FrameControl
                key={item.id}
                item={item}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default FrameOptions;
