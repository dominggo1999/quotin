const toSolidColor = (obj) => {
  const {
    r, g, b, a,
  } = obj;

  return (`rgba(${r},${g},${b},${a})`);
};

const toGradientColor = (obj1, obj2, rotation) => {
  return `linear-gradient(${rotation}deg, ${toSolidColor(obj1)} 0%, ${toSolidColor(obj2)} 100%)`;
};

const StaticLayer = ({ item }) => {
  const {
    solidColor, color1, color2, colorStyle, gradientRotation,
  } = item;

  const background = colorStyle === 'solid' ? toSolidColor(solidColor) : toGradientColor(color1, color2, gradientRotation);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        style={{
          background,
        }}
        className="w-full h-full"
      />
    </div>
  );
};

export default StaticLayer;
