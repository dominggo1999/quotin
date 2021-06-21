import { useState } from 'react';
import { useSelector } from 'react-redux';
import BackgroundControl from '../controls/BackgroundControl';
import useMapStateToArray from '../../hooks/useMapStateToArray';

const BackgroundOptions = () => {
  const layersState = useSelector((state) => state.layer);
  const layerInstances = useMapStateToArray(layersState);

  return (
    <div className="custom-scrollbar w-full h-full flex flex-col items-center overflow-y-scroll overflow-x-hidden">
      <div className="px-5 w-full flex items-center justify-center">
        {layerInstances && layerInstances.filter((i) => i.name === 'baseColor').map((item) => {
          return (
            <BackgroundControl
              key={item.id}
              item={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BackgroundOptions;
