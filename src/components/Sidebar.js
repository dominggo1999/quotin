import { useSelector, useDispatch } from 'react-redux';
import EditorTab from './EditorTab';
import EditorOptionContainer from './EditorOptionContainer';
import HideOptionButton from './HideOptionButton';
import { hideOption } from '../redux/sidebar/sidebarActions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { displayOption } = useSelector((state) => state.sidebar);

  const hideOptionHandler = () => {
    dispatch(hideOption());
  };

  return (
    <aside className="h-full flex relative bg-gray-400">
      <EditorTab />
      <EditorOptionContainer />

      {
        displayOption && <HideOptionButton hideOption={hideOptionHandler} />
      }
    </aside>
  );
};

export default Sidebar;
