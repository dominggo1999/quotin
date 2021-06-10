import EditorTab from './EditorTab';
import EditorOption from './EditorOption';

const Sidebar = () => {
  return (
    <aside className="h-screen bg-transparent flex">
      <EditorTab />
      <EditorOption />
    </aside>
  );
};

export default Sidebar;
