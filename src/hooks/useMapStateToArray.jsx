import React from 'react';

const useMapStateToArray = (stateObject) => {
  return Object.values(stateObject);
};

export default useMapStateToArray;
