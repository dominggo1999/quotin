import { useSelector, useDispatch } from 'react-redux';
import EditorOption from './EditorOption';

const EditorOptionContainer = () => {
  const { displayOption } = useSelector((state) => state.sidebar);

  if(!displayOption) {
    return null;
  }

  return (
    <div className="relative z-[1000] pt-[40px] pr-1 bg-tab-active min-w-[350px] max-w-[350px] h-full">
      <EditorOption />
    </div>
  );
};

export default EditorOptionContainer;
