import { toGradientColor } from '../util/colorConverter';

const StaticLayer = ({ item }) => {
  const {
    solidColor, color1, color2, opacityColor1, opacityColor2, colorStyle, gradientRotation, width, height,
  } = item;

  const background = colorStyle === 'solid' ? solidColor : toGradientColor(color1, color2, opacityColor1, opacityColor2, gradientRotation);

  toGradientColor(color1, color2, opacityColor1, opacityColor2, gradientRotation);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        style={{
          background,
          width,
          height,
        }}
      />
    </div>
  );
};

export default StaticLayer;
