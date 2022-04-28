import React, { cloneElement } from 'react';

const TextControlButton = ({
  children, onClick, readjustSize, className, shadow, uppercase, textAlignment, value, title,
}) => {
  let bg;

  if(shadow || uppercase) {
    bg = 'bg-menu';
  }

  if(textAlignment === value && textAlignment && value) {
    bg = 'bg-menu';
  }

  return (
    <button
      title={title}
      onClick={onClick}
      className={`text-white w-[35px] h-[35px] flex items-center justify-center ${bg} focus:outline-none mr-2 hover:bg-menu rounded-full`}
    >
      {cloneElement(children, {
        fill: '#ffffff',
        style: {
          width: readjustSize ? 16 + readjustSize : 16,
          height: readjustSize ? 16 + readjustSize : 16,
          color: '#ffffff',
        },
      })}
    </button>
  );
};

export default TextControlButton;
