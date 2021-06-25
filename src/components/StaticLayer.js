import { toGradientColor } from '../util/colorConverter';
import useLayerOrder from '../hooks/useLayerOrder';

const StaticLayer = ({ item, canvasSize }) => {
  const {
    solidColor, color1, color2, opacityColor1, opacityColor2, colorStyle, gradientRotation, display, name,
  } = item;

  const background = colorStyle === 'solid' ? solidColor : toGradientColor(color1, color2, opacityColor1, opacityColor2, gradientRotation);

  toGradientColor(color1, color2, opacityColor1, opacityColor2, gradientRotation);

  const zIndex = useLayerOrder(name);

  if(!display) {
    return null;
  }

  return (
    <div
      style={{
        background,
        width: canvasSize.width + 10, // to compensate html2canvas scaling
        height: canvasSize.height + 10, // to compensate html2canvas scaling
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex,
      }}
    />
  );
};

export default StaticLayer;
