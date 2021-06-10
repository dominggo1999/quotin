import Sidebar from '../components/Sidebar';
import CanvasEditor from '../components/CanvasEditor';
import EditorHeader from '../components/EditorHeader';

const Editor = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* <EditorHeader />
      <div className="flex w-full h-full">
        gew
      </div> */}

      <EditorHeader />
      <div className="relative flex w-full h-full bg-gray-400 overflow-hidden">
        <Sidebar />
        <CanvasEditor />
      </div>
    </div>
  );
};

export default Editor;
