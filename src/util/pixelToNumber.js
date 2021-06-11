const pixelToNumber = (pixel) => {
  if(typeof pixel === 'number') {
    return pixel;
  }

  // remove pixel
  pixel = pixel.replace('px', '');

  return parseInt(pixel, 10);
};

export default pixelToNumber;
