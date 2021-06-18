export const toSolidColor = (obj) => {
  const {
    r, g, b, a,
  } = obj;

  return (`rgba(${r},${g},${b},${a})`);
};

export const toGradientColor = (obj1, obj2, rotation) => {
  return `linear-gradient(${rotation}deg, ${toSolidColor(obj1)} 0%, ${toSolidColor(obj2)} 100%)`;
};
