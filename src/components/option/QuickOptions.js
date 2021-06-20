import { useSelector } from 'react-redux';
import TextControl from '../controls/TextControl';
import useMapStateToArray from '../../hooks/useMapStateToArray';

const QuickOption = ({ canvasSize }) => {
  const layersState = useSelector((state) => state.layer);
  const layerInstances = useMapStateToArray(layersState);

  return (
    <div className="px-5 w-full flex flex-col justify-center">
      {layerInstances && layerInstances.filter((i) => i.type === 'text').map((item) => {
        return (
          <TextControl
            canvasSize={canvasSize}
            key={item.id}
            name={item.name}
            lineHeight={item.lineHeight}
            fontSize={item.fontSize}
            width={item.width}
            height={item.height}
            text={item.text}
            uppercase={item.uppercase}
            shadow={item.shadow}
            highlightColor={item.highlightColor}
            textColor={item.textColor}
            letterSpacing={item.letterSpacing}
            quick
          />
        );
      })}
    </div>
  );
};

export default QuickOption;
