import React from 'react';
import OptionHeader from '../OptionHeader';
import ToggleDisplay from './ToggleDisplay';

const PhotoControl = ({ item, openBrowser }) => {
  return (
    <div className="order-first w-full flex flex-col mb-10 text-white">
      <div className="w-full flex justify-between items-center mb-3">
        <OptionHeader title="Background Photo" />
        <ToggleDisplay name={item.name} />
      </div>
      <button
        className="p-2 rounded-lg bg-purple-500"
        onClick={openBrowser}
      >Find Photo
      </button>
    </div>
  );
};

export default PhotoControl;
