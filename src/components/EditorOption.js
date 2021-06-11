import useState from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useOptionToDisplay from '../hooks/useOptionToDisplay';

const EditorOption = () => {
  const dispatch = useDispatch();
  const { activeTab, displayOption } = useSelector((state) => state.sidebar);
  const option = useOptionToDisplay(activeTab);

  if(!displayOption) {
    return null;
  }

  return (
    <div className="bg-tab-active w-[350px] h-full">
      {option}
    </div>
  );
};

export default EditorOption;
