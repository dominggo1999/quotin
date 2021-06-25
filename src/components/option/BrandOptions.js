import { useState } from 'react';
import { useSelector } from 'react-redux';
import useMapStateToArray from '../../hooks/useMapStateToArray';
import BrandControl from '../controls/BrandControl';

const BrandOptions = () => {
  const layersState = useSelector((state) => state.layer);
  const layerInstances = useMapStateToArray(layersState);

  return (
    <div className="custom-scrollbar w-full h-full flex flex-col items-center overflow-y-scroll overflow-x-hidden">
      <div className="px-5 w-full flex items-center flex-col">
        {
          layerInstances && layerInstances.filter((i) => i.type === 'brand').map((item) => {
            return (
              <BrandControl
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

export default BrandOptions;
