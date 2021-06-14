import { cloneElement } from 'react';

const TextControlButton = ({
  children, onClick, readjustSize, className,
}) => {
  return (
    <button
      onClick={onClick}
      className="text-white w-[35px] h-[35px] flex items-center justify-center focus:outline-none mr-2 hover:bg-menu rounded-full"
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
