import { useState } from 'react';
import { useSelector } from 'react-redux';
import BackgroundControl from '../controls/BackgroundControl';
import useMapStateToArray from '../../hooks/useMapStateToArray';
import PhotoPicker from '../controls/PhotoPicker';
import PhotoControl from '../controls/PhotoControl';

const BackgroundOptions = () => {
  const layersState = useSelector((state) => state.layer);
  const layerInstances = useMapStateToArray(layersState);
  const [showBrowser, setShowBrowser] = useState(false);

  const openBrowser = () => {
    setShowBrowser(true);
  };

  const closeBrowser = () => {
    setShowBrowser(false);
  };

  if(showBrowser) {
    return <PhotoPicker closeBrowser={closeBrowser} />;
  }

  return (
    <div className="custom-scrollbar w-full h-full flex flex-col items-center overflow-y-scroll overflow-x-hidden">
      <div className="px-5 w-full flex items-center flex-col">
        {layerInstances && layerInstances.map((item) => {
          if(item.name === 'photo') {
            return (
              <PhotoControl
                key={item.id}
                item={item}
                openBrowser={openBrowser}
              />
            );
          }

          if(item.name === 'baseColor') {
            return (
              <BackgroundControl
                key={item.id}
                item={item}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default BackgroundOptions;
