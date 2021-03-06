import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import CanvasEditor from '../components/CanvasEditor';
import EditorHeader from '../components/EditorHeader';
import useMapStateToArray from '../hooks/useMapStateToArray';

const Editor = () => {
  const state = useSelector((state) => state.layer);
  const [addingLinkFinished, setAddingLinkFinished] = useState(false);

  const layersState = useSelector((state) => state.layer);

  const layerInstances = useMapStateToArray(layersState);

  const fontUsed = layerInstances.filter((i) => i.type === 'text').map((item) => {
    return item.fontFamily;
  });

  useEffect(() => {
    fontUsed.map((font) => {
      const formatFontName = font.replaceAll(' ', '+');

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${formatFontName}&display=swap`;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);

      return null;
    });
  }, []);

  return (
    <div className="w-full h-screen flex flex-col font-sans">
      <EditorHeader />
      <div className="relative flex w-full h-full overflow-y-hidden">
        <Sidebar />
        <CanvasEditor />
      </div>
    </div>
  );
};

export default Editor;
