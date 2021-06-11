import { useSelector, useDispatch } from 'react-redux';
import EditorOption from './EditorOption';

const EditorOptionContainer = () => {
  const { displayOption } = useSelector((state) => state.sidebar);

  if(!displayOption) {
    return null;
  }

  return (
    <div className="bg-tab-active w-[350px] h-full">
      <EditorOption />
    </div>
  );
};

export default EditorOptionContainer;
