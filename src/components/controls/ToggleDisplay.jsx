import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLayer } from '../../redux/layer/layerActions';

const ToggleDisplay = ({ name }) => {
  const dispatch = useDispatch();
  const layer = useSelector((state) => state.layer);

  const [display, setDisplay] = useState(layer[name].display);

  const toggle = () => {
    dispatch(toggleLayer(name, 'display', !display));
    setDisplay(!display);
  };

  return (
    <div
      role="button"
      onClick={toggle}
      className="flex justify-center items-center text-white"
    >
      {
        display ? <AiOutlineEyeInvisible className="text-lg" />
          : <AiOutlineEye className="text-lg" />
      }

    </div>
  );
};

export default ToggleDisplay;
