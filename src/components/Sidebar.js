import { useSelector, useDispatch } from 'react-redux';
import EditorTab from './EditorTab';
import EditorOption from './EditorOption';
import HideOptionButton from './HideOptionButton';
import { hideOption } from '../redux/sidebar/sidebarActions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { showOption } = useSelector((state) => state.sidebar);

  const hideOptionHandler = () => {
    dispatch(hideOption());
  };

  return (
    <aside className="h-full  flex relative bg-menu">
      <EditorTab />
      <EditorOption />

      {
        showOption && <HideOptionButton hideOption={hideOptionHandler} />
      }
    </aside>
  );
};

export default Sidebar;
