import React from 'react';

const useBrandPosition = (position) => {
  const split = position.split('-').map((item) => {
    return item === 'center' ? item : `flex-${item}`;
  });

  return split;
};

export default useBrandPosition;
