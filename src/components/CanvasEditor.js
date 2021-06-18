import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RndLayer from './RndLayer';
import { updateLayerLayout } from '../redux/layer/layerActions';
import useMapStateToArray from '../hooks/useMapStateToArray';
import StaticLayer from './StaticLayer';

const CanvasEditor = ({ f }) => {
  const resultRef = useRef(null);
  const dispatch = useDispatch();
  const [activeLayerId, setActiveLayerId] = useState();

  const layersState = useSelector((state) => state.layer);

  const layerInstances = useMapStateToArray(layersState);

  // TODO: Make canvas size global
  const [canvasSize, setCanvasSize] = useState({
    width: 450,
    height: 450,
  });

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

  // Choose active layer id
  const setActive = (id) => {
    setActiveLayerId(id);
  };

  return (
    <main
      className="w-full h-full flex justify-center items-center relative bg-gray-300 min-w-[600px]"
    >

      {/* Canvas */}
      <div
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
        className="relative"
      >
        {/* shadow */}
        <div
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
          }}
          className="absolute shadow-canvas"
        >
        </div>
        <div
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
          }}
          id="canvas"
          ref={resultRef}
          className="relative z-10 overflow-hidden bg-gray-900"
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
            return (
              <StaticLayer
                key={item.id}
                item={item}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CanvasEditor;
