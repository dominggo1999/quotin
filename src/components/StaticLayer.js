import { toGradientColor } from '../util/colorConverter';

const StaticLayer = ({ item, canvasSize }) => {
  const {
    solidColor, color1, color2, opacityColor1, opacityColor2, colorStyle, gradientRotation,
  } = item;

  const background = colorStyle === 'solid' ? solidColor : toGradientColor(color1, color2, opacityColor1, opacityColor2, gradientRotation);

  toGradientColor(color1, color2, opacityColor1, opacityColor2, gradientRotation);

  return (
    <div
      style={{
        background,
        width: canvasSize.width + 5, // to compensate html2canvas scaling
        height: canvasSize.height + 5, // to compensate html2canvas scaling
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    />
  );
};

export default StaticLayer;
