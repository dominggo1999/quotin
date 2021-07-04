import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RndLayer from './RndLayer';
import { updateLayerLayout } from '../redux/layer/layerActions';
import useMapStateToArray from '../hooks/useMapStateToArray';
import useCanvasSize from '../hooks/useCanvasSize';
import StaticLayer from './StaticLayer';
import PhotoLayer from './PhotoLayer';
import FrameLayer from './FrameLayer';
import BrandLayer from './BrandLayer';

const CanvasEditor = () => {
  const resultRef = useRef(null);
  const dispatch = useDispatch();
  const [activeLayerId, setActiveLayerId] = useState();

  const layersState = useSelector((state) => state.layer);
  const canvas = useSelector((state) => state.canvas);
  const layerInstances = useMapStateToArray(layersState);

  const canvasSize = useCanvasSize(canvas);

  const updateX = (name, value) => {
    dispatch(updateLayerLayout(name, 'x', value));
  };

  const updateY = (name, value) => {
    dispatch(updateLayerLayout(name, 'y', value));
  };

  const updateWidth = (name, value) => {
    dispatch(updateLayerLayout(name, 'width', value));
  };

  const updateHeight = (name, value) => {
    dispatch(updateLayerLayout(name, 'height', value));
  };

  // Deactivate layer if clicking outside layer
  useEffect(() => {
    const deactivateLayer = (e) => {
      if(e.target.getAttribute('role') === 'region') {
        setActiveLayerId(e.target.id);
      }else{
        setActiveLayerId(null);
      }
    };

    window.addEventListener('mousedown', deactivateLayer);
    window.addEventListener('touchstart', deactivateLayer, { passive: false });

    return () => {
      window.removeEventListener('mousedown', deactivateLayer);
      window.removeEventListener('touchstart', deactivateLayer, { passive: false });
    };
  }, []);

  return (
    <main
      className="relative bg-gray-300 min-w-[600px] w-full overflow-y-auto"
    >
      {/* Canvas */}
      <div
        className="relative flex justify-center p-5 h-full items-center"
        style={{
          minWidth: canvasSize.width,
          minHeight: canvasSize.height,
        }}
      >
        <div
          style={canvasSize}
          id="canvas"
          ref={resultRef}
          className="relative z-10 overflow-hidden bg-green-700"
        >

          {layerInstances && layerInstances.map((item) => {
            if(item.type === 'text') {
              return (
                <RndLayer
                  canvasSize={canvasSize}
                  updateX={(value) => updateX(item.name, value)}
                  updateY={(value) => updateY(item.name, value)}
                  updateWidth={(value) => updateWidth(item.name, value)}
                  updateHeight={(value) => updateHeight(item.name, value)}
                  activeLayerId={activeLayerId}
                  key={item.id}
                  item={item}
                />
              );
            }

            if(item.type === 'brand') {
              return (
                <BrandLayer
                  key={item.id}
                  item={item}
                />
              );
            }

            if(item.type === 'frame') {
              return (
                <FrameLayer
                  key={item.id}
                  item={item}
                />
              );
            }

            if(item.type === 'photo') {
              return (
                <PhotoLayer
                  key={item.id}
                  item={item}
                  canvasSize={canvasSize}
                />
              );
            }

            return (
              <StaticLayer
                key={item.id}
                item={item}
                canvasSize={canvasSize}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CanvasEditor;
