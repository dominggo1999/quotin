import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import useCanvasSize from '../hooks/useCanvasSize';
import useMapStateToArray from '../hooks/useMapStateToArray';
import StaticLayer from './StaticLayer';
import PhotoLayer from './PhotoLayer';
import ResultText from './ResultText';
import ResultPhoto from './ResultPhoto';
import pixelToNumber from '../util/pixelToNumber';

const scale = 2;
const Result = () => {
  const layersState = useSelector((state) => state.layer);
  const layerInstances = useMapStateToArray(layersState);
  const canvas = useSelector((state) => state.canvas);
  const { height, width } = useCanvasSize(canvas);

  const [canvasSize, setCanvasSize] = useState({
    height: height * scale,
    width: pixelToNumber(width) * scale,
  });

  return (
    <div className="relative">
      <div
        style={{
          width: pixelToNumber(width) * scale,
          height: height * scale,
          background: 'red',
          position: 'absolute',
          zIndex: 9999,
        }}
        id="result"
      >
        {
          layerInstances && layerInstances.map((item) => {
            if(item.type === 'text') {
              return (
                <ResultText
                  key={item.id}
                  item={item}
                  scale={scale}
                  canvasSize={canvasSize}
                />
              );
            }

            if(item.type === 'photo') {
              return (
                <ResultPhoto
                  key={item.id}
                  item={item}
                  scale={scale}
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
          })
        }
      </div>
    </div>
  );
};

export default Result;
