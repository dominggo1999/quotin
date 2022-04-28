import React from 'react';

const useBrandIcon = (name, list) => {
  const Icon = list.filter((item) => {
    return item.name === name;
  });

  return Icon[0].icon;
};

export default useBrandIcon;
