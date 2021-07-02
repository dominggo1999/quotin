import { rgb, hex } from 'color-convert';

const toSolidColor = (obj) => {
  const {
    r, g, b, a,
  } = obj;

  if(a === 1) {
    return `rgb(${r},${g},${b})`;
  }

  return `rgba(${r},${g},${b},${a})`;
};

export const toGradientColor = (col1, col2, opacityColor1, opacityColor2, rotation) => {
  const arr1 = hex.rgb(col1);
  const arr2 = hex.rgb(col2);

  const rgba1 = {
    r: arr1[0],
    g: arr1[1],
    b: arr1[2],
    a: opacityColor1,
  };

  const rgba2 = {
    r: arr2[0],
    g: arr2[1],
    b: arr2[2],
    a: opacityColor2,
  };

  return `linear-gradient(${rotation}deg, ${toSolidColor(rgba1)}, ${toSolidColor(rgba2)})`;
};
