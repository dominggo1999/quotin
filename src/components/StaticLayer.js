import { toSolidColor, toGradientColor } from '../util/colorConvert';

const StaticLayer = ({ item }) => {
  const {
    solidColor, color1, color2, colorStyle, gradientRotation, width, height,
  } = item;

  const background = colorStyle === 'solid' ? toSolidColor(solidColor) : toGradientColor(color1, color2, gradientRotation);

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
